import React, { useState, useEffect } from "react";
import {
  Upload,
  X,
  Image as ImageIcon,
  Loader,
  Edit,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import API_BASE_URL from "../config";

const AdminDashboard = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("Mattress");
  const [stats, setStats] = useState({});
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/stats`);
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchProducts();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    if (originalPrice) formData.append("originalPrice", originalPrice);
    formData.append("category", category);

    images.forEach((img) => {
      formData.append("images", img.file);
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Product uploaded successfully!");
        setImages([]);
        setProductName("");
        setPrice("");
        setOriginalPrice("");
        fetchProducts(); // Refresh list
        fetchStats();
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading product.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      alert("Error deleting product");
    }
  };

  // --- Edit Logic ---
  const handleEditClick = (product) => {
    setEditingProduct({
      ...product,
      existingImages: product.images || [],
      newImages: [],
    });
  };

  const handleEditFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setEditingProduct((prev) => ({
        ...prev,
        newImages: [...(prev.newImages || []), ...newFiles],
      }));
    }
  };

  const removeExistingImage = (index) => {
    setEditingProduct((prev) => {
      const newExisting = [...prev.existingImages];
      newExisting.splice(index, 1);
      return { ...prev, existingImages: newExisting };
    });
  };

  const removeNewImage = (index) => {
    setEditingProduct((prev) => {
      const newNew = [...prev.newImages];
      URL.revokeObjectURL(newNew[index].preview);
      newNew.splice(index, 1);
      return { ...prev, newImages: newNew };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("name", editingProduct.name);
    formData.append("price", editingProduct.price);
    if (editingProduct.originalPrice)
      formData.append("originalPrice", editingProduct.originalPrice);
    formData.append("category", editingProduct.category);

    // Existing images
    if (editingProduct.existingImages) {
      editingProduct.existingImages.forEach((img) =>
        formData.append("existingImages", img)
      );
    }

    // New Files
    if (editingProduct.newImages) {
      editingProduct.newImages.forEach((img) =>
        formData.append("images", img.file)
      );
    }

    try {
      await axios.put(
        `${API_BASE_URL}/api/products/${editingProduct._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Product updated!");
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Update failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto bg-white shadow-xl min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-primary p-8 text-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
            <p className="opacity-80">Upload and manage your products</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/70 uppercase tracking-widest">
              Unique Visitors
            </p>
            <div className="flex flex-col items-end">
              <span className="text-4xl font-bold">
                {stats.totalUnique || 0}
              </span>
              <span className="text-xs text-white/50">
                Today: {stats.todayUnique || 0}
              </span>
            </div>
          </div>
        </div>

        {/* --- Upload Form --- */}
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Upload size={24} className="text-secondary" /> Add New Product
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-4xl bg-gray-50 p-6 rounded-xl"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="e.g. Royal Mattress"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary outline-none"
                >
                  <option>Mattress</option>
                  <option>Furniture</option>
                  <option>Pillows</option>
                  <option>Accessories</option>
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  Sale Price (₹)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  Original Price (MRP)
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary outline-none"
                />
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white hover:bg-gray-50 transition-colors cursor-pointer relative">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
              />
              <div className="flex flex-col items-center gap-2 pointer-events-none">
                <ImageIcon className="text-secondary w-10 h-10" />
                <span className="text-gray-600 font-medium">
                  Click to upload product images
                </span>
              </div>
            </div>

            {images.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-4">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 flex-shrink-0 group"
                  >
                    <img
                      src={img.preview}
                      alt="preview"
                      className="w-full h-full object-cover rounded-lg border shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              disabled={uploading}
              type="submit"
              className="bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary-dark transition-colors disabled:opacity-50 w-full md:w-auto"
            >
              {uploading ? "Uploading..." : "Publish Product"}
            </button>
          </form>
        </div>

        {/* --- Product List Section --- */}
        <div className="p-8 bg-gray-50 flex-grow">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Manage Products
          </h2>
          <div className="grid gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${
                          product.images && product.images[0]
                            ? product.images[0].startsWith("http")
                              ? product.images[0]
                              : `${API_BASE_URL}${product.images[0]}`
                            : ""
                        })`,
                      }}
                    ></div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {product.name}
                      </h3>
                      <div className="text-sm text-gray-500">
                        ₹{product.price}
                        {product.originalPrice && (
                          <span className="line-through ml-2 text-xs text-red-400">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600 mt-1 inline-block">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-400">
                No products found. Start adding some!
              </div>
            )}
          </div>
        </div>

        {/* --- Edit Modal --- */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Edit size={20} /> Edit Product
                </h2>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    Name
                  </label>
                  <input
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-lg outline-none focus:border-secondary"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: e.target.value,
                        })
                      }
                      className="w-full border p-3 rounded-lg outline-none focus:border-secondary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Original Price
                    </label>
                    <input
                      type="number"
                      value={editingProduct.originalPrice || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          originalPrice: e.target.value,
                        })
                      }
                      className="w-full border p-3 rounded-lg outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                {/* Image Management in Edit */}
                <div>
                  <label className="text-sm font-bold block mb-2 text-gray-700">
                    Current Images{" "}
                    <span className="text-xs font-normal text-gray-500">
                      (Click X to remove)
                    </span>
                  </label>
                  {editingProduct.existingImages &&
                  editingProduct.existingImages.length > 0 ? (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {editingProduct.existingImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative w-24 h-24 flex-shrink-0 group"
                        >
                          <img
                            src={
                              img.startsWith("http")
                                ? img
                                : `${API_BASE_URL}${img}`
                            }
                            className="w-full h-full object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      No existing images.
                    </p>
                  )}
                </div>

                {/* Add New Images */}
                <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg bg-gray-50 relative">
                  <input
                    type="file"
                    multiple
                    onChange={handleEditFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="edit-file-upload"
                  />
                  <label
                    htmlFor="edit-file-upload"
                    className="text-secondary font-bold cursor-pointer"
                  >
                    Add New Images
                  </label>
                </div>
                {editingProduct.newImages &&
                  editingProduct.newImages.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 mt-2">
                      {editingProduct.newImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative w-24 h-24 flex-shrink-0 group"
                        >
                          <img
                            src={img.preview}
                            className="w-full h-full object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="flex-1 py-3 border rounded-lg hover:bg-gray-50 font-bold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark font-bold shadow-lg"
                  >
                    {uploading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
