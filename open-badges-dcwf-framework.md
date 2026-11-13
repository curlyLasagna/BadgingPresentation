---
marp: true
theme: default
size: 16:9
paginate: true
title: Open Badges 3.0 and the DCWF Badging Framework
description: Responsibility boundaries, issuance flow, verification, and an example Achievement JSON-LD handoff.
footer: DCWF Badging Framework
style: |
  :root {
    --navy: #0b1f33;
    --blue: #1d5f8a;
    --cyan: #37b7c3;
    --green: #84cc16;
    --ink: #17212b;
    --muted: #52616f;
    --paper: #f7fafc;
  }
  section {
    background: var(--paper);
    color: var(--ink);
    font-family: Inter, Aptos, Arial, sans-serif;
    font-size: 27px;
    padding: 54px 66px;
  }
  section::after {
    color: var(--blue);
    font-size: 16px;
  }
  h1 {
    color: var(--navy);
    font-size: 44px;
    letter-spacing: -0.02em;
  }
  h2 {
    color: var(--navy);
    font-size: 36px;
    letter-spacing: -0.01em;
  }
  strong {
    color: var(--blue);
  }
  li {
    margin: 0.45em 0;
  }
  code {
    font-size: 0.82em;
  }
  pre {
    border-left: 5px solid var(--cyan);
    border-radius: 8px;
    padding: 18px 22px;
  }
  footer {
    color: var(--muted);
    font-size: 14px;
  }
  section.lead {
    background: linear-gradient(135deg, var(--navy), #123f5f 70%, var(--blue));
    color: white;
    text-align: left;
  }
  section.lead h1,
  section.lead h2,
  section.lead strong {
    color: white;
  }
  section.lead footer,
  section.lead::after {
    color: #d8eef2;
  }
  section.diagram svg[data-marp-mermaid] {
    max-height: 410px;
  }
  section img {
    display: block;
    max-width: 100%;
    max-height: 430px;
    margin: 0 auto;
    object-fit: contain;
  }
  section.issuance {
    padding-top: 36px;
    padding-bottom: 36px;
  }
  section.issuance h1 {
    font-size: 38px;
  }
  section.issuance svg[data-marp-mermaid] {
    display: block;
    max-width: 100%;
    max-height: 480px;
    margin: 0 auto;
  }
  section.jsonld pre {
    font-size: 12.5px;
    line-height: 1.14;
    margin-top: 8px;
  }
  section.sources {
    font-size: 20px;
  }
  section.sources h2 {
    font-size: 34px;
  }
---

<!-- _class: lead -->

# Badging Framework

Draft Prototypes

---

<!-- _class: diagram -->
Proposed Badge Hierarchy
```mermaid

flowchart TB
    subgraph ROLE511["Cyber Defense Analyst (511)"]
        direction TB
        B1["Network Traffic Analysis<br/>KSAs: 214A, 87, 233"]
        B2["Threat Detection & Analysis<br/>KSAs: 66, 895, 181A"]
        B3["Incident Investigation & Correlation<br/>KSAs: 353, 150, 1120"]
    end

    subgraph SHARED["Shared Badge"]
        BS["Security Risk Analysis<br/>KSAs: 108, 895"]
    end

    subgraph ROLE541["Vulnerability Assessment Analyst (541)"]
        direction TB
        B4["Vulnerability Scanning & Identification<br/>KSAs: 3B, 105, 4"]
        B5["Application Vulnerability Assessment<br/>KSAs: 10A, 10, 102A"]
        B6["Security Risk & Remediation Analysis<br/>KSAs: 108, 897A, 160"]
    end

    ROLE511 --> BS
    ROLE541 --> BS

    classDef badge fill:#B8D6EF,stroke:#6593B8,color:#234461
    classDef shared fill:#E6D4F4,stroke:#9775B7,color:#563274

    class B1,B2,B3,B4,B5,B6 badge
    class BS shared

```

- Badges are a subset relevant KSAs
- Badges and work roles have a many to many relationship

---

<!-- _class: diagram -->

```mermaid
classDiagram
    direction LR

    class WorkRole {
        +String roleId
        +String name
    }

    class Badge {
        +String name
        +String description
        +Integer level
    }

    class KSA {
        +String code
        +String type
        +String description
    }

    class EligibilityCriteria {
        +String observableBehavior
        +String evaluationCriteria
        +String evidenceType
    }

    WorkRole "1..*" -- "0..*" Badge : associated with
    Badge "0..*" -- "1..*" KSA : requires
    Badge "1" *-- "1..*" EligibilityCriteria : defines

```

---

# Proposed Badge Levels

<!-- _class: diagram -->

```mermaid
flowchart LR
    L1["Level 1<br/>Tutorial<br/><br/>Student follows guided steps"]
    L2["Level 2<br/>Directed Challenge<br/><br/>Student receives direct instructions but no tutorial"]
    L3["Level 3<br/>Independent Problem Solving<br/><br/>Student is given a problem and must determine the solution"]

    L1 --> L2 --> L3

    classDef level fill:#B8D6EF,stroke:#487FAC,color:#183C58

    class L1,L2,L3 level
```
---

# Missing Pieces

- Mapping between evidence and KSAs 
- What evidence is composed of


---

# Technical Section

---

# Open Badges 3.0 makes the credential portable

- The primary artifact is a signed verifiable credential expressed as JSON-LD.
- An achievement image is optional, so a badge can exist and travel without a PNG or SVG.
- Cryptographic evidence is added at issuance, while verification is performed later by a verifier or displayer.
- App wallets such as [Learner Credential Wallet](https://lcw.app/) can be used by participants to store their earned badges.
- Verification may still resolve the issuer public key and check current expiration or revocation status.

<!--
Sources:
https://www.imsglobal.org/spec/ob/v3p0/
https://www.imsglobal.org/spec/ob/v3p0/impl/
-->

---

# Responsibility boundary

- We name and describe each achievement in language that a learner and verifier can understand.
- We map observable competition activities to selected DCWF skill 
- We define thresholds, required evidence, badge levels, and versioning rules.
- We maintain DCWF guidelines.
- Cyber Games track performance, determine qualification, create the credential, and signs it.
- A future host stores, displays, shares, and verifies issued credentials when that role is assigned.

<!--
Source: Open Badges 3.0 distinguishes an Achievement creator from the credential issuer.
https://www.imsglobal.org/spec/ob/v3p0/#differentiating-issuers-and-achievement-creators
-->

---

# What we provide

- Each record should state human-readable earning criteria that match measurable competition outcomes.
- Each alignment should include a skill code, exact skill description, and framework name.
- JSON-LD is a natural interchange format because they can embed the Achievement in each issued credential.
- A public API that Cyber Games can reach out to before issuing and signing a badge. 

<!--
Source: Open Badges 3.0 Achievement, Criteria, and Alignment data models.
https://www.imsglobal.org/spec/ob/v3p0/#achievement
https://www.imsglobal.org/spec/ob/v3p0/#criteria
https://www.imsglobal.org/spec/ob/v3p0/#alignment
-->

---

# Minihack Tier 1 Example

![](./hack_inst.png)

<!--
Source: User-provided IMG_0425.jpeg showing the Minihack Tier 1 objective, topology, and scoring conditions.
-->

---

<!-- _class: jsonld -->

# JSON-LD makes guideline alignments portable

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"
  ],
  "id": "https://our-org.example/achievements/minihack-tier-1-routing",
  "type": ["Achievement"],
  "name": "Minihack Tier 1 — Network Routing and Configuration",
  "description": "Demonstrates foundational routing, subnetting, and network-segmentation skills in a scored competition environment.",
  "achievementType": "Badge",
  "humanCode": "MH-T1-NET",
  "version": "1.0.0",
  "creator": {
    "id": "https://our-org.example/profile",
    "type": ["Profile"],
    "name": "Our Organization"
  },
  "criteria": {
    "narrative": "Configure the team router so its external interface responds to scoring, external web requests reach the internal web server, and the required team identifier appears on the root webpage."
  },
  "alignment": [
    {
      "type": ["Alignment"],
      "targetCode": "S0035",
      "targetName": "Skill in establishing a routing schema",
      "targetFramework": "DoD Cyber Workforce Framework",
      "targetUrl": "https://standards.example.org/guidelines/S0035"
    },
    {
      "type": ["Alignment"],
      "targetCode": "S0162",
      "targetName": "Skill in sub-netting",
      "targetFramework": "DoD Cyber Workforce Framework",
      "targetUrl": "https://standards.example.org/guidelines/S0162"
    },
    {
      "type": ["Alignment"],
      "targetCode": "S0168",
      "targetName": "Skill in setting up physical or logical sub-networks that separate an internal LAN from other untrusted networks",
      "targetFramework": "DoD Cyber Workforce Framework",
      "targetUrl": "https://standards.example.org/guidelines/S0168"
    }
  ]
}
```

---

<!-- _class: diagram -->

# They turns our badging definition into a credential

```mermaid
flowchart LR
    Definition["Achievement JSON-LD<br><i>SecurEd</i>"]
    Results["Participant results<br><i>Competition Platform</i>"]
    Credential["OpenBadgeCredential<br><i>Cyber Games</i>"]
    Badge["Badge"]

    Definition --> Credential
    Results --> Credential
    Credential --> Badge
```

- Cyber games adds recipient identity, issuance dates, evidence or results, issuer identity, schema references, and proof.
- The signed credential can embed our Achievement definition or preserve its stable identifier and agreed metadata.

<!--
Source: Open Badges 3.0 AchievementCredential and AchievementSubject data models.
https://www.imsglobal.org/spec/ob/v3p0/#achievementcredential
https://www.imsglobal.org/spec/ob/v3p0/#achievementsubject
-->

---

<!-- _class: diagram issuance -->

# Issuance

```mermaid
sequenceDiagram
    participant Learner as Participant
    participant CyberGames as Cyber Games
    participant GuidelinesAPI as Standard Guidelines API
    participant Host as Future host or displayer

    Learner->>CyberGames: Complete competition activity
    CyberGames->>GuidelinesAPI: Request badge metadata as JSON-LD
    GuidelinesAPI-->>CyberGames: Return Achievement and guideline alignments
    CyberGames->>CyberGames: Evaluate measured outcomes
    alt Participant qualifies
        CyberGames->>CyberGames: Build and sign OpenBadgeCredential
        CyberGames-->>Learner: Issue portable credential
        opt Host is selected
            Learner-->>Host: Import or share credential
        end
    else Participant does not qualify
        CyberGames-->>Learner: No credential is issued
    end
```

<!--
Source: Open Badges 3.0 verification and validation procedures.
https://www.imsglobal.org/spec/ob/v3p0/#verification-and-validation
-->

<!--
Source: Open Badges 3.0 data models, proof formats, and verification requirements.
https://www.imsglobal.org/spec/ob/v3p0/
-->

---

<!-- _class: diagram -->

# Standard guidelines database

```mermaid
erDiagram
    direction LR
    COMPETITION_ACTIVITY }o--|| BADGE : maps_to
    BADGE ||--|{ BADGE_GUIDELINE : has
    GUIDELINE ||--o{ BADGE_GUIDELINE : is_selected_by

    GUIDELINE {
        objectId _id PK
        string name
        string guideline
        objectId frameworkId
    }
    BADGE {
        objectId _id PK
        string achievementId
        string name
        string version
    }
    COMPETITION_ACTIVITY {
        objectId _id PK
        string name
        objectId badgeId FK
    }
    BADGE_GUIDELINE {
        objectId _id PK
        objectId badgeId FK
        objectId guidelineId FK
    }
```

---

<!-- _class: diagram -->

# Possible integrations with CLARK 

- **Learning-object showcase:** compare a badge's `badge_guidelines.guidelineId` values with the guideline IDs mapped to the learning object's outcomes; show the matching badge when their intersection is nonempty within the details page.
- **Browse filter:** when a user selects a badge, redirect to a CLARK browse page with at least one outcome mapped to one of that badge's guideline IDs.
