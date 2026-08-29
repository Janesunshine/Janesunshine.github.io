---
title: "SignStream"
tag: "Computer Vision"
excerpt: "Built as part of the AT&T DESP 2026 Program, SignStream is a real-time American Sign Language recognition system that converts live signing video into fluent English captions for deaf and hard-of-hearing accessibility. Hand and body landmarks are extracted client-side with MediaPipe Holistic, which shrinks the per-sign payload to ~13 KB, then classified by a Spatio-Temporal Graph Convolutional Network (ST-GCN) reaching 80–90% top-1 (95%+ top-3) accuracy on a 100-sign vocabulary, with CPU-only inference at 165 ms P95 latency. An agentic correction-and-translation pipeline (Gloss Assembler + Translator) refines raw predictions into production-ready captions, served through a three-stage microservices architecture on Azure Kubernetes Service.<br/><img src='/images/signstream.png' style='width:100%; max-width:1000px; '>"
collection: portfolio
links:
  - label: "GitHub"
    url: "https://github.com/phanmtim/att-tourists"
  - label: "Technical report"
    url: "https://phanmtim.github.io/att-tourists/"
---
