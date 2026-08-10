---
rule_id: ALG-001
trigger: model_decision
description: Algorithms, Big O, Data Structures & System Design Algorithms Handbook
applies_to: [SA, DEV, LEADER]
version: "6.0-llm"
---

# 🧠 Algorithms & Data Structures Handbook

<identity>
A cheat-sheet summarizing major algorithms, Data Structures, and Time Complexity. Designed for System Design evaluation or Micro-optimizations.
</identity>

<activation>
Activated when optimizing performance of bottleneck APIs or evaluating Schemas / data structures storing large loops.
</activation>

<thinking_pattern>
1. Does the current problem have nested O(n²) loops or intermediate Array operations O(n)?
2. Can O(n) be converted to O(1) using a Hash Map?
3. Is this algorithm appropriate for Distributed Systems design?
</thinking_pattern>

<guidelines>
## 1. BIG O NOTATION & DATA STRUCTURES
- **O(1)**: Absolute. *Hash Map/Dict/Object*. Used for counting, caching, mapping lookups.
- **O(log n)**: Outstandingly fast. *Binary Search*, *B-Tree* (Database Indexes). Used for searching over SORTED data.
- **O(n)**: Linear. Iterating *Array*, *Linked List*. Easily bottlenecks if n = Millions.
- **O(n log n)**: Sorting (*Merge Sort, Quick Sort*). Native `.sort()` functions in languages are n log n. Don't sort if unnecessary.
- **O(n²)**: Scaling nightmare, avoid nesting 2 `for` loops. Use **Sliding Window** or **Two Pointers** to reduce down to O(n).

## 2. PROBLEM SOLVING PARADIGMS
- **Two Pointers/Window**: Replaces 2 For loops (e.g., contiguous substrings).
- **Dynamic Programming (DP / Memoization)**: Store past results instead of O(2^n) recursion. "Trade space for time".
- **Greedy**: Take optimal choice per step (e.g., Coin Change, Job Scheduling). Easy to code but beware of edge case failures.

## 3. SYSTEM DESIGN ALGORITHMS
- **Hashing/Cryptography**: SHA-256 (Checksum), Bcrypt/Argon2 (Passwords - deliberately slow to block Brute-force).
- **Caching**: **LRU** (Least Recently Used - removes oldest item), **LFU** (Least Frequently Used).
- **Rate Limiting**: **Token Bucket** (Smooth request flow), **Sliding Window** (Prevents sudden spikes).
- **Distributed & Balancing**: **Consistent Hashing** (Load Balancer hashing preventing DB crash when adding nodes), **Raft/Paxos** (Leader election, Fault Tolerance).

## 4. PRAGMATIC PERFORMANCE RULES
1. **Trade Space For Time**: Cloud RAM is abundant, Database/CPU is the bottleneck. Readily create large O(N) Hash Maps in memory to reduce processing time to O(1).
2. **SQL Indexes**: Slow queries = Missing index (B-Tree). This is the biggest algorithm used daily.
</guidelines>

<anti_patterns>
❌ Premature optimization of a 1,000-item array loop with complex algorithms instead of KISS.
❌ Mindlessly calling `.sort()` on arrays before returning API responses.
</anti_patterns>
