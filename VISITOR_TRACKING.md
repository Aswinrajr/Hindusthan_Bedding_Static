# Unique Visitor Calculation Logic

## Overview
Unique visitors are calculated by tracking and counting distinct IP addresses for each day. This logic is implemented in the backend API endpoint (`/api/stats` or similar) that aggregates data from the `Visitor` collection in the MongoDB database, or by filtering log entries.

## How it works

1.  **Tracking Visits (Implied):**
    *   Whenever a user visits the website (implied, usually done via a middleware or a specific "visit" API call on frontend load), their IP address is captured.
    *   This IP address, along with the current timestamp, is stored in a database collection (e.g., `Visitor` logs).

2.  **Calculating "Unique Visitors":**
    *   **Total Unique:** The system counts the number of *distinct* IP addresses present in the entire `Visitor` history.
        *   *Example:* If IP `192.168.1.1` visits 50 times, it counts as **1** unique visitor.
    *   **Today's Unique:** The system filters the visit logs to include only those from the current day (starting from 00:00:00). Then, it counts the distinct IP addresses within that subset.

## Technical Implementation (Conceptual)

```javascript
// Example MongoDB Aggregation for Stats

// 1. Total Unique Visitors
const uniqueTotal = await Visitor.distinct("ipAddress"); // Returns array of unique IPs
const totalCount = uniqueTotal.length;

// 2. Today's Unique Visitors
const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

const todayUnique = await Visitor.find({
    timestamp: { $gte: startOfDay }
}).distinct("ipAddress");

const todayCount = todayUnique.length;
```

## Privacy Note
The system uses IP addresses for deduplication purposes to provide accurate analytics. No personal identifiable information (PII) is linked to these stats unless the user explicitly logs in or provides it.
