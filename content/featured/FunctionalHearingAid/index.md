---
date: '3'
title: 'Prototyping a Functional Hearing Aid'
cover: './demo.png'
github: 'https://github.com/nipunaupeksha/codecomposer-codes-fyp'
external: 'https://arxiv.org/abs/2303.17829'
tech:
  - C
  - MATLAB
  - TMS320C5535eZDSP
  - Code Composer Studio
---

This is the final year project under BSc. in Electronics and Telecommunication Engineering specializing Biomedical Engineering. The research goal was to protoyping a hearing aid for the people with hearing impairments.

Since good quality hearing aid are quite expensive, this project was initiated as the first step of making a good quality hearing aid locally. The prototype is incorporated with several enterprise and research level algorithms including, dual adaptive filter method for feedback cancellation, coherence algorithm for adaptive directionality using two omnidirectional microphones, adaptive filter methods for noise cancellations(LMS, NLMS, ANLMS, RLS, AFA) and frequency shaper function for gain controlling. All of the algorithms were implemented using MATLAB initially, and then tested with subjective and objective metrics and finally implemented within the TMS320C5535 eZDSP module.
