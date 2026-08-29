---
title: "Visualizing Space Debris"
tag: "Data Visualization · Geospatial ML"
excerpt: "Built an interactive 3D/2D heatmap of orbital debris collision risk that scales to 50M+ untracked fragments, something traditional point-based visualizations break down on. Fused NASA's ORDEM flux model with CelesTrak/Space-Track satellite tracking data into a unified H3 hexagonal risk score, then shipped it as GPU-accelerated vector tiles (Deck.gl + Tippecanoe + AWS S3) for real-time exploration by altitude band. The model hit a 97.5% accuracy rate against held-out test points, and in user testing it answered risk questions 52% faster than an existing debris visualization tool. Team project for CSE 6242 (Data & Visual Analytics) at Georgia Tech.<br/><img src='/images/space-debris-viz.png' style='width:100%; max-width:1000px; '>"
collection: portfolio
featured: true
links:
  - label: "Live Visualization"
    url: "https://cse-6242-space-debris.vercel.app/"
  - label: "Report"
    url: "/files/space-debris-report.pdf"
  - label: "Poster"
    url: "/files/space-debris-poster.pdf"
---
