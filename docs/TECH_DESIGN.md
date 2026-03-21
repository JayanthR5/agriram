# AgriQCert Technical Documentation

## System Architecture
AgriQCert follows a modern MERN stack architecture (MongoDB, Express, React, Node) containerized with Docker. It integrates W3C Verifiable Credentials for tamper-proof agricultural certification.

### Architecture Diagram
[ Frontend (React) ] <-> [ API Layer (Express/Node) ] <-> [ Database (MongoDB) ]
                                 |
                        [ VC Engine (Inji Certify/Verify) ]

## API Architecture
- **Auth**: JWT-based role-based access control.
- **Batch**: Product management for exporters.
- **Inspection**: Quality check workflow for QA agencies.
- **VC**: Issuance and verification using DID-based standards.

## VC Issuance Flow
1. Exporter uploads batch.
2. Admin assigns QA Agency.
3. QA Agency inspects and submits "Pass".
4. QA Agency issues VC.
5. System generates QR code containing the VC reference.

## VC Verification Flow
1. Importer scans QR code.
2. QR link leads to verification page.
3. System verifies VC signature using Inji Verify.
4. Authenticity status and product data displayed.

## User Guide

### Exporter Workflow
1. Register as Exporter.
2. Use "Upload New Batch" to list products.
3. Track status in the dashboard.
4. Once "Certified", click the QR icon to view/print the Digital Passport.

### QA Workflow
1. Register as QA.
2. Wait for Admin approval.
3. View assigned batches in "Inspection Queue".
4. Click "Start Inspection" and enter lab results.
5. Submit to issue certification.

### Admin Setup
1. Register first user as Admin (or update DB).
2. Approve pending QA registrations.
3. Assign batches to specific QA agencies.
