import Seo from '../components/Seo';

const TERM_GROUPS = [
  {
    "id": "agreement",
    "title": "Agreement, Scope & Commercial Framework",
    "clauses": [
      {
        "number": 1,
        "title": "Introduction, Legal Identity and Scope",
        "paragraphs": [
          "These Terms & Conditions constitute the general legal and commercial framework governing the use of the official website of Digitalness Industries LLP, the engagement of its professional services, and the contractual relationships established between Digitalness Industries LLP (“Digitalness”, “Agency”, “Company”, “we”, “us” or “our”) and any person, organisation, business entity or authorised representative engaging its services (“Client”, “Customer” or “you”).",
          "Digitalness operates as a digital marketing, creative communication, technology development and business solutions provider. Its services may include Meta advertising, Google advertising, search engine optimisation, Google Business Profile management, social media management, branding, graphic design, photography, videography, website development, web applications, mobile applications, customer relationship management systems, software integrations, WhatsApp communication systems, IVR solutions, automation, consulting, analytics and associated professional services.",
          "These Terms are intended to establish clear expectations, preserve legitimate commercial interests, define service responsibilities and reduce avoidable misunderstandings concerning payments, timelines, delivery, approvals, performance and ownership.",
          "The Terms apply to paid projects when expressly incorporated into an accepted proposal, quotation, service agreement, purchase order or statement of work. Mere access to the Digitalness website does not automatically create a paid service contract.",
          "All provisions shall be interpreted in accordance with applicable Indian laws, and no clause shall eliminate a statutory obligation or remedy that cannot lawfully be excluded."
        ]
      },
      {
        "number": 2,
        "title": "Contract Formation and Authorised Acceptance",
        "paragraphs": [
          "A formal commercial relationship may be established through a written service agreement, accepted proposal, approved quotation, digitally signed document, authorised purchase order or other legally valid form of acceptance.",
          "Acceptance may be recorded through electronic communications where the parties' intention to enter into a binding agreement and the agreed commercial terms can be established.",
          "The individual accepting the agreement on behalf of an organisation represents that they possess the necessary authority to bind that organisation. Digitalness may request documentary evidence of such authority where reasonably necessary.",
          "A proposal is ordinarily an offer or invitation to engage on its stated conditions and remains subject to its specified validity period, availability of resources and any stated prerequisites.",
          "Digitalness reserves the right to decline an engagement where the requested work is unlawful, involves material regulatory risk, falls outside its capabilities or creates a conflict with existing contractual obligations.",
          "Where several documents govern an engagement, priority shall generally be given to an expressly negotiated and signed agreement, followed by the accepted statement of work, accepted quotation and these general Terms, unless the parties agree to another hierarchy."
        ]
      },
      {
        "number": 3,
        "title": "Description of Services and Scope Limitations",
        "paragraphs": [
          "Digitalness shall provide the services expressly described in the applicable commercial agreement, within the agreed quantity, scope, schedule, technical specifications and commercial consideration.",
          "Digital marketing engagements may involve campaign planning, audience research, advertisement configuration, creative design, advertising management, optimisation and reporting.",
          "Social media management engagements may include content calendars, approved poster quantities, reels, captions, account publishing and platform-specific activities.",
          "Website and software development engagements may include requirements analysis, interface design, development, testing, deployment, integrations, documentation and agreed technical support.",
          "Services not expressly identified in the accepted scope shall not be presumed included merely because they are generally advertised on the Digitalness website or discussed during preliminary consultations.",
          "The client acknowledges that additional features, content revisions, integrations, platform migration, technical modifications, advanced functionality or new business requirements may require a separate quotation and adjusted delivery schedule.",
          "Digitalness has no obligation to provide unlimited services, unlimited revisions, indefinite technical support or work outside the accepted agreement without additional authorisation."
        ]
      },
      {
        "number": 4,
        "title": "Service Commencement, Onboarding and Project Activation",
        "paragraphs": [
          "A project shall ordinarily commence only after completion of the applicable onboarding requirements, receipt of the agreed advance payment and provision of necessary information or access credentials.",
          "Onboarding may include business verification, approval of service scope, collection of brand assets, confirmation of campaign objectives, account access arrangements, website or hosting details, target audience information, regulatory authorisations and appointment of an authorised client representative.",
          "Any indicated commencement or completion dates are dependent on the timely fulfilment of those requirements.",
          "Where the client fails to provide necessary cooperation, Digitalness may defer project activation or revise delivery timelines upon notice.",
          "Digitalness shall not be responsible for delays directly attributable to incomplete onboarding, withheld information, missing platform approvals, inaccessible accounts or other documented client-controlled dependencies.",
          "Resource allocation and production schedules may be revised where prolonged delays require reassignment of personnel, provided any resulting additional charges are agreed as required under the contract."
        ]
      },
      {
        "number": 5,
        "title": "Monthly Retainers, Subscription Services and Billing Cycles",
        "paragraphs": [
          "Recurring digital marketing, social media, SEO, Google Business Profile, website maintenance, CRM support and other ongoing services shall be governed by the agreed monthly or periodic billing arrangement.",
          "Unless otherwise specified in writing, recurring professional service fees are payable in advance for the upcoming service period.",
          "The billing cycle, service commencement date, renewal arrangement, cancellation notice period and included deliverables shall be identified in the relevant proposal or agreement.",
          "Digitalness may issue invoices and payment reminders before or after the scheduled billing date.",
          "Where the contract provides a five-calendar-day payment grace period, the grace period shall apply to the relevant scheduled payment without permanently changing the contractual due date.",
          "Continuation of work during a grace period is a commercial accommodation and does not waive Digitalness's right to require timely payment in future cycles.",
          "Monthly service charges are consideration for the agreed professional services, resources and work performed during the applicable service period. They do not constitute a guarantee of commercial outcomes.",
          "Unused monthly services do not automatically accumulate into later months unless the engagement expressly permits carry-forward."
        ]
      },
      {
        "number": 6,
        "title": "Payment Defaults, Suspension and Outstanding Amounts",
        "paragraphs": [
          "Clients are required to settle valid invoices within the period specified in the accepted agreement.",
          "Where payment remains outstanding after the contractual due date and applicable grace period, Digitalness may issue formal reminders and written notice of the intended suspension of affected services.",
          "If the client does not remedy the default within the applicable notice period, Digitalness may suspend further work, discontinue future scheduling, pause agency-managed advertising operations or defer release of deliverables to the extent legally and contractually permitted.",
          "Digitalness shall act reasonably to avoid unnecessary destruction of client data or disproportionate disruption to services involving public safety, statutory compliance or other mandatory responsibilities.",
          "Suspension caused by client payment default may result in reduced advertising activity, interruption of scheduled publications, missed campaign opportunities or revised project dates. Digitalness shall not be liable for such consequences to the extent they directly arise from a lawful and properly notified suspension rather than its own breach.",
          "Outstanding fees for authorised work already completed or properly incurred remain payable notwithstanding suspension or termination.",
          "Any interest, collection charges or compensation for late payment shall be governed by the express agreement and applicable law, including restrictions on contractual penalties."
        ]
      },
      {
        "number": 7,
        "title": "Taxes, Invoicing and Statutory Deductions",
        "paragraphs": [
          "All agreed professional charges shall be subject to applicable taxes, including Goods and Services Tax where legally chargeable, unless expressly stated to be tax-inclusive.",
          "Digitalness shall issue invoices containing the particulars required under applicable tax law.",
          "Where the client is legally required to deduct tax at source, the client shall comply with applicable withholding obligations and provide valid supporting documentation within the relevant statutory period.",
          "A failure to provide required tax deduction documentation may be treated as an unresolved billing matter, subject to reconciliation under applicable law.",
          "The client shall not make unilateral deductions, offsets or adjustments against invoices except as permitted under the written agreement or applicable law.",
          "Bank charges, international transaction charges, currency conversion costs and other payment processing expenses shall be allocated according to the accepted commercial terms."
        ]
      },
      {
        "number": 8,
        "title": "Advertising Budgets and Media Expenditure",
        "paragraphs": [
          "Advertising budgets are separate from Digitalness's professional management charges unless a signed agreement expressly provides otherwise.",
          "Meta Ads bidding budgets, Google Ads expenditure, YouTube advertising expenditure, paid promotional placements and other media costs are paid to the relevant advertising platforms or authorised intermediaries.",
          "Clients must approve and maintain sufficient media budgets and valid payment arrangements.",
          "Where Digitalness is expressly authorised to administer advertising budgets, expenditure shall be managed within the agreed budget parameters, subject to platform billing behaviour, taxes, authorised adjustments and applicable technical limitations.",
          "Digitalness shall not be required to finance a client's advertising activity from its own funds unless separately agreed in writing.",
          "The client acknowledges that campaign delivery, pricing, audience availability, auction results and expenditure may vary according to platform systems and market conditions.",
          "Digitalness does not control the final policies, billing decisions, review systems or commercial operations of Meta, Google or other third-party advertising providers."
        ]
      }
    ]
  },
  {
    "id": "marketing",
    "title": "Marketing, Platforms & Creative Services",
    "clauses": [
      {
        "number": 9,
        "title": "Marketing Results and Commercial Performance",
        "paragraphs": [
          "Digital marketing performance is influenced by factors that may not be within Digitalness's control, including industry competition, customer demand, product suitability, market conditions, advertising budgets, sales follow-up, business reputation, pricing, website experience and customer decision-making.",
          "Digitalness shall exercise reasonable professional skill and care in carrying out agreed advertising and marketing activities but does not guarantee a minimum number of enquiries, purchases, appointments, admissions, bookings, followers, website visitors, search rankings or revenue unless an enforceable written performance commitment expressly states otherwise.",
          "Projected results, estimated advertising costs, sample reports, case studies and strategic forecasts are indicative planning information rather than unconditional guarantees.",
          "The client remains responsible for customer interactions, product delivery, inventory, pricing, sales processes and the conversion of enquiries into paying customers, except for activities specifically delegated to Digitalness under the written agreement.",
          "A campaign's failure to achieve a client-desired commercial outcome does not independently establish a service breach where Digitalness has fulfilled the agreed professional obligations.",
          "A genuine dispute about non-performance, defective services or breach of an express contractual commitment shall nevertheless be assessed under the agreement and applicable law."
        ]
      },
      {
        "number": 10,
        "title": "Google, Meta and Other Platform Account Management",
        "paragraphs": [
          "Digitalness may request access to advertising accounts, social media pages, Google Business Profiles, analytics systems, website administration panels and other digital assets needed to perform the engagement.",
          "Where practical, such access should be provided through official business-manager roles, delegated permissions or approved access mechanisms rather than shared personal passwords.",
          "Ownership and administration of accounts shall be governed by the applicable platform rules and the engagement agreement. Digitalness shall not claim ownership of pre-existing client accounts merely because it manages them.",
          "The client must ensure that accounts and connected business activities meet applicable platform eligibility, verification, advertising and commerce requirements.",
          "Digitalness may recommend operational changes, campaign restructuring, tracking configurations and page optimisations, but material decisions requiring client authorisation shall remain subject to the agreed approval process.",
          "Account restrictions, verification failures, ad rejections, policy changes or platform suspensions caused by independent third-party decisions shall not automatically constitute a breach by Digitalness.",
          "Digitalness remains responsible where an account issue results from its own proven contractual breach, negligence or other legally attributable misconduct."
        ]
      },
      {
        "number": 11,
        "title": "Creative Production, Approvals and Publishing",
        "paragraphs": [
          "Posters, reels, marketing videos, website content, advertising copy, promotional banners, brochures and other creative assets shall be produced according to the agreed scope and approved brand requirements.",
          "The client shall appoint an authorised representative responsible for consolidating feedback, providing factual information and approving final materials.",
          "Digitalness may submit concepts, drafts or previews for review before publication or production.",
          "The agreed scope shall determine the number of revision rounds and the types of amendments included. Corrections required to bring work into conformity with an agreed specification shall not automatically be treated as separately chargeable changes.",
          "Requests for substantially different concepts, new campaign directions, repeated reversals of previously approved requirements or additional deliverables may require a revised quotation.",
          "Digitalness may rely on documented approvals for publication, while remaining responsible for its own applicable legal and contractual duties.",
          "Where no approval is received, Digitalness may defer publication or delivery rather than assume approval, unless a clearly documented and lawful pre-authorisation procedure permits otherwise."
        ]
      },
      {
        "number": 12,
        "title": "Client Content, Accuracy and Legal Permissions",
        "paragraphs": [
          "Clients must ensure that all factual claims, product information, service descriptions, price representations, discounts, promotional offers, testimonials and materials supplied to Digitalness are accurate and legally supportable.",
          "The client warrants that it possesses the necessary rights, permissions and licences to authorise use of supplied photographs, trademarks, videos, music, literary works, product designs, personal images and other protected materials.",
          "Where a campaign concerns a regulated industry, including healthcare, education, real estate, legal services, financial services or other restricted categories, the client must provide applicable registrations, licences, mandatory disclosures and legally required advertising information.",
          "Digitalness may request supporting documentation where an advertising claim appears questionable or falls within a regulated area.",
          "The Company reserves the right to refuse or suspend publication of content reasonably believed to infringe applicable law, third-party rights or platform policies.",
          "The client shall be responsible for third-party claims caused by its materially inaccurate or unlawful instructions to the extent established under the relevant indemnity provisions and applicable law."
        ]
      },
      {
        "number": 13,
        "title": "Search Engine Optimisation and Local Search Services",
        "paragraphs": [
          "SEO services may include technical assessments, keyword research, on-page optimisation, content recommendations, website structure improvements, metadata revisions, internal linking, performance monitoring and local search optimisation.",
          "Google Business Profile services may include category optimisation, business descriptions, posts, photo updates, profile maintenance and other approved local visibility work.",
          "Search engines independently determine search rankings and may modify algorithms, indexing systems, search features and content evaluation practices.",
          "Digitalness does not guarantee first-page ranking, a particular keyword position, guaranteed map-pack placement or permanent improvement in organic search traffic unless expressly committed under a lawful written agreement.",
          "The client is responsible for maintaining truthful business information, eligible business locations, accurate operating details and valid rights to use the claimed business identity.",
          "Digitalness shall not be required to create fabricated reviews, misleading business listings, fictitious locations, deceptive backlinks or other prohibited methods.",
          "Changes in search rankings or platform visibility shall be evaluated in the context of the agreed service obligations rather than automatically treated as a breach."
        ]
      }
    ]
  },
  {
    "id": "technology",
    "title": "Technology, CRM & Production Services",
    "clauses": [
      {
        "number": 14,
        "title": "Website Design, Development and Functional Requirements",
        "paragraphs": [
          "Website projects shall be implemented according to agreed business requirements, design specifications, page counts, technology choices, integrations and documented functionality.",
          "Development work may include planning, interface design, responsive layouts, frontend development, backend development, database integration, content management, testing, deployment and other expressly contracted activities.",
          "Additional pages, advanced animations, booking systems, payment gateways, multilingual functionality, custom dashboards, third-party integrations, accessibility enhancements or other features may require additional charges if not included in the original scope.",
          "The client is responsible for reviewing the approved requirements and informing Digitalness of material operational needs before the relevant development milestone.",
          "Digitalness shall make reasonable efforts to deliver work according to agreed technical standards and acceptance criteria.",
          "Compatibility with all future browsers, operating systems, devices, software versions or third-party systems is not guaranteed unless a continuing compatibility obligation has been expressly accepted."
        ]
      },
      {
        "number": 15,
        "title": "Hosting, Domains and Technology Infrastructure",
        "paragraphs": [
          "Domain registration, website hosting, SSL/TLS certificates, cloud infrastructure, email hosting, third-party licences, storage, backups and subscription services may involve recurring charges separate from development fees.",
          "The applicable agreement shall specify whether such services are purchased directly by the client or administered by Digitalness.",
          "A client-managed domain or hosting account remains subject to the client's obligation to renew subscriptions, maintain correct registration details and preserve necessary access.",
          "Digitalness shall not be responsible for a lapse caused exclusively by the client's failure to renew or pay for independently maintained services.",
          "Where Digitalness is expressly responsible for renewal, monitoring or technical administration, its obligations shall be determined by that agreement.",
          "Website availability may be affected by maintenance, hosting failures, cyber incidents, DNS issues, provider outages or other infrastructure events.",
          "No uninterrupted uptime guarantee applies unless stated in a separate service-level commitment."
        ]
      },
      {
        "number": 16,
        "title": "CRM Systems, Automation and Third-Party Integrations",
        "paragraphs": [
          "CRM, workflow automation, customer communication and application integration projects depend on agreed technical requirements, source data, third-party interfaces, credentials and platform capabilities.",
          "The client must ensure that data supplied for migration or automation is lawfully obtained, reasonably accurate and suitable for its intended use.",
          "Digitalness may configure lead assignment, customer notifications, reporting workflows, data synchronisation, automated reminders and similar functions according to written instructions.",
          "Automated processes can produce errors where source data is inaccurate, systems become unavailable or third-party interfaces change unexpectedly.",
          "The client remains responsible for reviewing business-critical outputs and maintaining appropriate operational oversight unless responsibility for such monitoring has been expressly delegated.",
          "Where an integration provider changes an API, pricing, access policy or technical specification, implementation changes may require a mutually approved variation to the original contract.",
          "Digitalness may suspend an integration that presents a material security or regulatory risk, subject to appropriate notice and contractual requirements."
        ]
      },
      {
        "number": 17,
        "title": "WhatsApp, IVR, Messaging and Customer Communications",
        "paragraphs": [
          "WhatsApp Business integrations, messaging automation, IVR, cloud telephony, bulk notifications and communication workflows depend on the requirements of the relevant service providers and applicable communication laws.",
          "The client is responsible for obtaining lawful permissions for promotional messages, using accurate recipient information and complying with applicable restrictions concerning unsolicited commercial communications.",
          "Digitalness may provide configuration, templates, routing logic, automation and technical support as agreed but does not guarantee unlimited messaging, perpetual API availability, fixed delivery rates or approval of every communication template.",
          "Clients shall not use Digitalness-managed systems for spam, phishing, impersonation, fraud, harassment, unlawful solicitation or unauthorised access to personal data.",
          "Digitalness may reject or disable instructions reasonably believed to create unlawful messaging or cybersecurity risk.",
          "Regulatory duties imposed directly on Digitalness remain its own responsibility and cannot be excluded by these Terms."
        ]
      },
      {
        "number": 18,
        "title": "Photography, Videography and Production Services",
        "paragraphs": [
          "Where photography, videography, drone shoots, event coverage, promotional filming or other production services are agreed, the applicable quotation shall identify the location, duration, production requirements, deliverables and associated costs.",
          "The client shall obtain necessary venue permissions, location access, participant permissions and other authorisations allocated to it under the agreement.",
          "Additional travel, accommodation, studio rental, reshooting, equipment, models, performers or production requirements shall be separately approved where not included in the original quotation.",
          "Weather, local restrictions, venue availability, equipment conditions and other external circumstances may affect production schedules.",
          "Digitalness shall exercise reasonable care in managing agreed production activities while observing applicable rules concerning privacy, intellectual property, filming permissions and drone operations.",
          "The ownership, licensing and permitted reuse of raw footage, project files, final edited videos and photographs shall follow the relevant written intellectual property provisions."
        ]
      }
    ]
  },
  {
    "id": "rights",
    "title": "Intellectual Property, Delivery, Support & Data",
    "clauses": [
      {
        "number": 19,
        "title": "Intellectual Property and Deliverable Ownership",
        "paragraphs": [
          "Digitalness retains ownership of its pre-existing proprietary resources, reusable code, templates, design systems, software libraries, tools, workflows, processes, methodologies and know-how.",
          "Client-owned trademarks, business records, original content and other materials supplied by the client remain subject to the client's lawful rights.",
          "Ownership of newly created designs, websites, software, written content and other deliverables shall be determined by the relevant written agreement and applicable intellectual property law.",
          "Where the parties intend to assign copyright, the assignment must comply with statutory requirements concerning written execution, identification of rights, duration, territorial extent and consideration.",
          "Unless expressly agreed otherwise, Digitalness may retain ownership of background technology incorporated into a delivered solution and grant the client an appropriate licence to use that technology as part of the agreed deliverable.",
          "Payment-linked assignments or licences become effective according to the written contractual conditions, subject to applicable law.",
          "Unpaid draft concepts, rejected alternatives and unused creative directions shall not automatically become the client's property unless separately agreed.",
          "Third-party licensed materials remain subject to their original licences and cannot be assigned beyond rights legally available to Digitalness."
        ]
      },
      {
        "number": 20,
        "title": "Source Code, Design Files and Handover",
        "paragraphs": [
          "The delivery of a functioning website, application, video or graphic does not automatically require disclosure of every underlying working file, internal template, proprietary development utility or third-party source component.",
          "The applicable project agreement shall identify whether handover includes editable design files, source-code repositories, compiled applications, deployment instructions, database exports, administrative credentials, technical documentation or training.",
          "Where source-code transfer is included, the parties shall specify its extent, format and any limitations relating to reusable components and third-party licences.",
          "Digitalness shall provide agreed deliverables upon completion of the relevant contractual conditions.",
          "Handover may be scheduled after settlement of properly due amounts where the agreement lawfully links ownership or delivery obligations to payment.",
          "Digitalness shall not misuse possession of client credentials, personal data or critical operational information as leverage in a payment dispute."
        ]
      },
      {
        "number": 21,
        "title": "Project Milestones, Testing and Acceptance",
        "paragraphs": [
          "Development projects may be organised into discovery, design, implementation, testing, deployment and final acceptance milestones.",
          "Each milestone may require client feedback or written approval before the next stage begins.",
          "The client shall examine presented deliverables against the agreed specification and notify Digitalness of identifiable material defects within the review period set out in the project agreement.",
          "Digitalness shall be provided a reasonable opportunity to correct verified non-conformities for which it is contractually responsible.",
          "Issues caused by later client modifications, unauthorised third-party changes or new functional requirements may be treated separately from defects in the originally agreed deliverable.",
          "Production launch, commercial use or milestone acceptance may provide evidence of acceptance of the corresponding work, but shall not remove statutory remedies or contractual warranties concerning defects that could not reasonably have been discovered during review."
        ]
      },
      {
        "number": 22,
        "title": "Maintenance, Technical Support and Post-Delivery Obligations",
        "paragraphs": [
          "Unless continuing maintenance or technical support is expressly included, completion of a development project does not create an indefinite obligation to provide free updates, additional functionality or ongoing operational management.",
          "A maintenance agreement may separately cover bug resolution, content updates, hosting assistance, technical monitoring, security patches, backups, integration updates or response-time commitments.",
          "Support is ordinarily coordinated through Digitalness's designated communication channels during its published business support hours or other hours specified in the service agreement.",
          "Requests received outside agreed working hours may be addressed during the next applicable support period unless emergency coverage has been separately purchased.",
          "The classification and resolution of technical incidents depend on severity, contractual service levels, available information and dependencies.",
          "Digitalness may charge for support outside the agreed maintenance scope, subject to prior commercial authorisation."
        ]
      },
      {
        "number": 23,
        "title": "Client Communication and Authorised Instructions",
        "paragraphs": [
          "Clients shall designate one or more authorised representatives who may issue project instructions, approve content, request changes and receive contractual communications.",
          "Digitalness may reasonably rely on instructions issued through designated project communication channels, unless it knows or ought reasonably to know that the instruction is unauthorised or suspicious.",
          "Material changes involving cost, scope, ownership, termination or sensitive access should be confirmed through an appropriate documented approval process.",
          "Digitalness is not required to implement mutually inconsistent instructions issued by different client representatives without clarification of the client's authorised position.",
          "The Company may maintain records of relevant approvals, revisions, project discussions and delivery confirmations for operational, evidentiary and legal purposes, subject to applicable privacy requirements.",
          "Routine project communication may occur through email, approved client-management systems, telephone or WhatsApp, but formal legal notices must follow the mechanism specified in the governing agreement."
        ]
      },
      {
        "number": 24,
        "title": "Confidentiality and Protection of Business Information",
        "paragraphs": [
          "Both parties may exchange non-public commercial, financial, technical, marketing, operational and strategic information during the engagement.",
          "Each party shall protect the other's confidential information using reasonable safeguards and shall not disclose or use that information outside permitted contractual purposes.",
          "Digitalness may restrict personnel access to client business information and may use authorised employees, professional advisers or contracted service providers subject to appropriate confidentiality obligations.",
          "Confidentiality restrictions do not apply to information that becomes lawfully public, is independently developed, is already lawfully known or must be disclosed under a legal requirement.",
          "Where disclosure is legally required, the receiving party may disclose the minimum information reasonably necessary, subject to applicable procedural protections.",
          "The obligation to protect qualifying confidential information shall continue after the engagement ends for the agreed duration or as otherwise required by law."
        ]
      },
      {
        "number": 25,
        "title": "Privacy, Data Security and System Access",
        "paragraphs": [
          "Personal information handled during the engagement shall be processed in accordance with applicable privacy law, the Digitalness Privacy Policy and any relevant data-processing agreement.",
          "Each party shall fulfil its own statutory responsibilities according to its role in determining the purpose and manner of personal-data processing.",
          "Clients must provide accurate instructions and lawful authorisation when requesting processing of customer records, advertising leads, messaging databases or other personal information.",
          "Digitalness shall use safeguards appropriate to its legal obligations and the agreed technical scope.",
          "Clients are responsible for maintaining the security of their independently controlled devices, credentials, internal networks and personnel permissions.",
          "Where a breach or suspected compromise occurs, the parties shall reasonably cooperate in investigation, containment and legally required notification, subject to the division of responsibilities under applicable law.",
          "A general disclaimer of absolute cybersecurity guarantees does not excuse a failure to comply with legally mandatory security obligations."
        ]
      }
    ]
  },
  {
    "id": "risk",
    "title": "Conduct, Termination, Risk & Third Parties",
    "clauses": [
      {
        "number": 26,
        "title": "Acceptable Use and Prohibited Conduct",
        "paragraphs": [
          "No client or website user may knowingly misuse Digitalness services to commit fraud, distribute malicious software, conduct unlawful surveillance, infringe intellectual property, impersonate others, unlawfully collect personal information or engage in other prohibited conduct.",
          "Digitalness may decline requests involving deceptive advertising, fabricated customer reviews, false business identities, fraudulent lead generation, unlawful financial promotions or other practices reasonably believed to violate applicable law.",
          "Clients shall not attempt to obtain unauthorised access to Digitalness's internal systems, confidential files, personnel accounts, proprietary development resources or other client information.",
          "Unauthorised copying or redistribution of protected Company materials is prohibited except to the extent permitted by law or express agreement.",
          "Digitalness may preserve relevant evidence and seek appropriate legal remedies for substantiated unlawful conduct.",
          "Any suspension or termination undertaken under this clause shall be proportionate, lawful and subject to applicable contractual notice requirements where practical."
        ]
      },
      {
        "number": 27,
        "title": "Professional Conduct and Workplace Safety",
        "paragraphs": [
          "Digitalness and its clients shall maintain professional communication throughout the engagement.",
          "Threats, unlawful harassment, discriminatory conduct, deliberate intimidation, fraudulent instructions and abusive behaviour directed toward personnel are not acceptable.",
          "Digitalness may require that serious disputes be handled through designated management or written communication channels.",
          "Where necessary to protect staff, systems or other individuals, Digitalness may restrict access to particular communication channels while preserving legally required complaint and notice mechanisms.",
          "The Company may suspend affected on-site activities where there is an objectively reasonable safety risk, subject to contractual obligations and applicable law.",
          "Ordinary criticism, legitimate complaints and lawful requests for contractual performance shall not be treated as misconduct."
        ]
      },
      {
        "number": 28,
        "title": "Termination, Cancellation and Project Closure",
        "paragraphs": [
          "Either party may terminate a service engagement according to its agreed notice period, minimum commitment, milestone structure and termination provisions.",
          "Digitalness may terminate for material non-payment, serious unlawful activity, persistent material breach or other contractually recognised grounds, subject to applicable notice and cure requirements.",
          "A client may terminate where Digitalness materially breaches the agreement and fails to remedy a remediable breach within an applicable reasonable period.",
          "Where a project is cancelled before completion, Digitalness may invoice for authorised work performed, completed milestones, reasonably documented work in progress and recoverable contractual expenses.",
          "Prepayments for unperformed services shall be addressed through a lawful and fair reconciliation in accordance with the contract.",
          "Termination does not erase accrued payment obligations, valid intellectual property restrictions, confidentiality duties or other provisions that lawfully survive.",
          "Neither party may use termination to avoid mandatory statutory responsibilities."
        ]
      },
      {
        "number": 29,
        "title": "Refunds, Credits and Financial Reconciliation",
        "paragraphs": [
          "Refund eligibility shall depend on the nature of the service, amount of work performed, accepted milestones, third-party commitments and the terms of the relevant agreement.",
          "Where Digitalness has performed an agreed service with reasonable skill and care, a client is not automatically entitled to a refund solely because the desired commercial result was not achieved.",
          "Where a service has not been provided or there has been a material contractual breach, the parties shall assess the appropriate remedy under their contract and applicable law.",
          "Non-recoverable expenses must be reasonably attributable to authorised commitments and shall not be invented or treated as automatic penalties.",
          "Refunds due under law shall not be excluded by describing every payment as non-refundable.",
          "Where mutually appropriate, the parties may agree to corrective work, replacement services or account credits in satisfaction of an otherwise negotiable commercial dispute."
        ]
      },
      {
        "number": 30,
        "title": "Third-Party Vendors and External Dependencies",
        "paragraphs": [
          "Digitalness may use external providers for hosting, domains, cloud services, payment processing, stock assets, software libraries, advertising platforms, analytics, telephony, API integrations and other supporting activities.",
          "Third-party services may have their own usage restrictions, privacy practices, intellectual property terms and charges.",
          "Digitalness may recommend suitable providers but does not warrant that independent third parties will maintain permanent availability, unchanged functionality or constant prices.",
          "Where a third party changes its system in a manner that materially affects the agreed service, Digitalness may propose a revised technical solution, schedule or quotation.",
          "Digitalness remains accountable for the responsibilities it expressly undertakes regarding vendor selection, integration, configuration or management and for applicable non-excludable legal duties.",
          "The client shall be informed where material third-party fees or obligations must be separately accepted."
        ]
      },
      {
        "number": 31,
        "title": "Force Majeure and Events Beyond Reasonable Control",
        "paragraphs": [
          "Neither party shall be responsible for a delay or failure in performance to the extent directly caused by an event genuinely beyond its reasonable control that prevents the affected obligation from being performed.",
          "Such events may include natural disasters, government restrictions, major public infrastructure interruptions, civil emergencies and comparable extraordinary circumstances.",
          "The affected party must provide reasonable notice, take practicable mitigation steps and resume performance when feasible.",
          "Commercial inconvenience, predictable business challenges or insufficient financial resources are not automatically force majeure.",
          "If an exceptional event continues long enough to substantially frustrate performance, the parties may exercise termination or adjustment rights available under the agreement and applicable law.",
          "Lawful obligations accrued before the relevant event remain subject to the contract and statutory requirements."
        ]
      },
      {
        "number": 32,
        "title": "Limitation of Liability and Commercial Risk Allocation",
        "paragraphs": [
          "Digitalness shall exercise reasonable professional skill and care in providing its contracted services.",
          "Subject to applicable law, Digitalness shall not be liable for commercial losses arising solely from independent customer decisions, changes in advertising algorithms, unexpected market demand, client sales practices or unrelated third-party service failures.",
          "To the maximum extent permitted by law, the aggregate contractual liability of Digitalness arising from an affected engagement shall be limited to the professional service fees paid or payable for the affected services during the six months immediately preceding the event giving rise to the claim, or the agreed fees under the affected one-time project if lower.",
          "The limitation does not apply to fraud, wilful misconduct or liabilities that cannot lawfully be limited. Additional exceptions expressly negotiated in a signed agreement shall prevail.",
          "No provision limits statutory consumer remedies, mandatory privacy or cybersecurity duties or other non-excludable liabilities.",
          "Neither party shall be entitled to compensation for speculative, remote or legally unrecoverable losses merely because a project failed to meet a commercial expectation.",
          "The parties acknowledge that the commercial fees were negotiated in light of the allocation of responsibilities, risks and obligations established in the agreement."
        ]
      },
      {
        "number": 33,
        "title": "Indemnification and Third-Party Claims",
        "paragraphs": [
          "Where permitted by law, the client shall indemnify Digitalness against reasonable direct losses and expenses arising from substantiated third-party claims attributable to the client's unlawful advertising instructions, unauthorised intellectual property, misleading factual representations, invalid permissions or unlawful processing instructions.",
          "The client shall not be required to indemnify Digitalness for losses attributable to Digitalness's own legally actionable misconduct, contractual breach or negligence.",
          "Digitalness shall likewise remain responsible for third-party claims to the extent required by its own express contractual indemnities or applicable law.",
          "The indemnified party shall provide reasonably prompt notice of a relevant claim, permit appropriate participation in its defence and cooperate in mitigating loss.",
          "No settlement may impose additional non-monetary obligations or admissions on another party without the necessary authorisation.",
          "Indemnities shall not be construed as automatic compensation without an established legal or contractual basis."
        ]
      },
      {
        "number": 34,
        "title": "Portfolio Use, Publicity and Brand References",
        "paragraphs": [
          "Digitalness may seek permission to feature completed client work, campaign illustrations, website screenshots or project descriptions in its professional portfolio.",
          "Such use shall remain subject to the agreed publicity rights, confidentiality obligations, privacy requirements and applicable intellectual property rights.",
          "No client endorsement, commercial performance claim, testimonial or identifiable private information may be fabricated or published without the legally required support and permissions.",
          "A client may request removal of material where it establishes a relevant contractual or legal ground.",
          "Digitalness may continue to describe its own general experience and technical capabilities without disclosing protected client information."
        ]
      },
      {
        "number": 35,
        "title": "Independent Contractor and Non-Exclusive Engagement",
        "paragraphs": [
          "Digitalness operates as an independent professional service provider.",
          "The engagement does not automatically create an employment relationship, joint venture, partnership or legal agency between Digitalness and the client.",
          "Digitalness may provide services to other businesses, including businesses operating within the same industry, unless a specific enforceable exclusivity arrangement has been agreed.",
          "Confidential information, proprietary materials and trade secrets shall not be misused for the benefit of competing engagements.",
          "Neither party may bind the other to unrelated legal or financial obligations without proper written authority.",
          "Any restrictions concerning recruitment, solicitation or competing activities shall be assessed separately for enforceability under Indian law."
        ]
      }
    ]
  },
  {
    "id": "law",
    "title": "Applicable Law, Disputes & Official Notices",
    "clauses": [
      {
        "number": 36,
        "title": "Applicable Indian Laws and Regulatory Responsibilities",
        "paragraphs": [
          "The parties acknowledge that their commercial relationship may involve obligations under various Indian legal frameworks depending on the nature of the services.",
          "Relevant legislation may include the Indian Contract Act, 1872; Information Technology Act, 2000; Digital Personal Data Protection Act, 2023 and applicable rules and commencement notifications; Consumer Protection Act, 2019; Copyright Act, 1957; Trade Marks Act, 1999; Arbitration and Conciliation Act, 1996; and applicable taxation, electronic communication and sector-specific regulatory provisions.",
          "Each party shall comply with statutory requirements directly applicable to its own activities.",
          "The client shall remain responsible for the truthfulness and legal eligibility of the products, services and business claims it authorises Digitalness to promote.",
          "Digitalness shall be responsible for its own legally required professional conduct, processing safeguards and service obligations.",
          "Nothing in the agreement shall be interpreted as granting either party permission to violate mandatory law."
        ]
      },
      {
        "number": 37,
        "title": "Complaints, Disputes and Arbitration",
        "paragraphs": [
          "A client wishing to raise a material service dispute should submit a written description of the issue, relevant supporting information and the proposed resolution through the designated official email or contractual notice channel.",
          "The parties shall first attempt to resolve the matter through good-faith discussions.",
          "Unless a separate agreement specifies another period, unresolved commercial disputes may be escalated after 30 calendar days from receipt of a formal dispute notice.",
          "Disputes lawfully capable of arbitration may be referred to arbitration under the Arbitration and Conciliation Act, 1996, as amended.",
          "The arbitration shall be conducted by a mutually appointed independent and impartial sole arbitrator. If the parties cannot agree on an appointment, the appointment process prescribed by applicable law shall apply.",
          "Unless otherwise agreed, the legal seat of arbitration shall be Hyderabad, Telangana, and proceedings shall be conducted in English.",
          "Subject to applicable jurisdictional requirements and non-excludable statutory remedies, courts having competent jurisdiction at Hyderabad may hear permitted proceedings relating to the agreement.",
          "This clause does not prevent lawful interim relief, statutory regulatory complaints or the exercise of consumer remedies that cannot lawfully be excluded."
        ]
      },
      {
        "number": 38,
        "title": "Amendments, Notices and Electronic Records",
        "paragraphs": [
          "Digitalness may update general website terms to reflect operational changes, technology developments or applicable legal requirements.",
          "Changes affecting existing paid service contracts shall take effect only through a legally valid amendment mechanism or mutual agreement where required.",
          "Commercial notices may be delivered to the official email addresses or other channels expressly designated in the relevant contract.",
          "Electronic records, written confirmations, approved proposals, invoices and related communications may be retained as evidence where lawful and relevant.",
          "Failure by Digitalness to enforce a particular provision on one occasion shall not automatically constitute a permanent waiver.",
          "If a provision is held invalid or unenforceable, the remainder of the agreement shall remain effective to the extent legally permissible."
        ]
      },
      {
        "number": 39,
        "title": "Entire Agreement and Continuing Obligations",
        "paragraphs": [
          "The accepted service agreement, incorporated statement of work, approved quotation, applicable data-processing terms and these Terms constitute the contractual framework to the extent expressly incorporated.",
          "Informal representations and preliminary discussions shall not override clear written contractual commitments unless a legally valid variation has been agreed.",
          "The client acknowledges that material obligations involving fees, deliverables, ownership, confidentiality and service performance should be recorded in writing.",
          "Provisions concerning accrued payments, confidentiality, lawful intellectual property protections, dispute resolution and other obligations intended to survive termination shall continue according to their terms and applicable law."
        ]
      },
      {
        "number": 40,
        "title": "Official Contact, Legal Notices and Company Information",
        "paragraphs": [
          "All official contractual communications, service-related enquiries and legal correspondence should be directed through the designated channels of Digitalness Industries LLP.",
          "Digitalness Industries LLP",
          "Website: https://digitalness.co.in Email: info@digitalness.co.in WhatsApp: +91 9989329642 Support: +91 404 5369584 Registered Office: [Insert verified full registered office address] LLPIN: [Insert verified LLP identification number]",
          "The official email address should be used for formal written service complaints and commercial disputes unless the relevant signed agreement designates another notice address.",
          "Final Legal Interpretation",
          "These Terms are intended to provide a commercially balanced and legally sustainable framework that protects the legitimate business interests, intellectual property, financial entitlements, operational independence and professional reputation of Digitalness Industries LLP.",
          "Nothing in these Terms shall be interpreted to exclude mandatory statutory obligations, authorise unlawful conduct or deprive any party of rights that cannot lawfully be waived.",
          "Where a mandatory legal provision conflicts with a contractual clause, the applicable mandatory legal provision shall prevail to the extent of the conflict."
        ]
      }
    ]
  }
];

export default function TermsConditions() {
  return (
    <>
      <Seo
        title="Terms & Conditions"
        path="/terms-conditions"
        description="Comprehensive website and professional service terms for Digitalness Industries LLP."
      />

      <style>{`
        .terms-page {
          padding: 68px 0 96px;
        }

        .terms-shell {
          display: grid;
          grid-template-columns: 240px minmax(0, 1fr);
          gap: 34px;
          align-items: start;
        }

        .terms-nav {
          position: sticky;
          top: 100px;
          display: grid;
          gap: 8px;
          padding: 14px;
          border: 1px solid #e5e2f0;
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 16px 44px rgba(19, 1, 80, .05);
        }

        .terms-nav strong {
          padding: 4px 8px 10px;
          color: #130150;
          font-size: .78rem;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .terms-nav a {
          padding: 10px 11px;
          border-radius: 10px;
          color: #5f6072;
          font-size: .82rem;
          font-weight: 750;
          line-height: 1.35;
        }

        .terms-nav a:hover {
          color: #130150;
          background: #f5f2ff;
        }

        .terms-content {
          min-width: 0;
        }

        .terms-meta {
          margin-bottom: 30px;
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 9px 20px;
          border: 1px solid #e5e2f0;
          border-radius: 18px;
          background: #faf9ff;
          color: #55536b;
          line-height: 1.6;
        }

        .terms-meta strong {
          color: #130150;
        }

        .terms-intro {
          margin-bottom: 30px;
          padding: 22px 24px;
          border-left: 4px solid #6d5dfc;
          border-radius: 0 16px 16px 0;
          background: #f7f5ff;
          color: #56566b;
          line-height: 1.8;
        }

        .terms-group {
          scroll-margin-top: 110px;
          margin-bottom: 52px;
        }

        .terms-group > h2 {
          margin: 0 0 22px;
          padding-bottom: 14px;
          border-bottom: 1px solid #e5e2f0;
          color: #130150;
          font-size: clamp(1.55rem, 2.7vw, 2.15rem);
          letter-spacing: -.025em;
        }

        .terms-clause {
          padding: 0 0 28px;
          margin-bottom: 28px;
          border-bottom: 1px solid #eceaf3;
        }

        .terms-clause:last-child {
          margin-bottom: 0;
        }

        .terms-clause-title {
          display: flex;
          gap: 10px;
          align-items: baseline;
          margin-bottom: 13px;
          color: #191532;
          font-weight: 850;
          line-height: 1.35;
        }

        .terms-clause-number {
          flex: none;
          color: #6d5dfc;
          font-size: .78rem;
          letter-spacing: .08em;
        }

        .terms-clause-title span:last-child {
          font-size: 1.03rem;
        }

        .terms-clause p {
          margin: 0 0 13px;
          color: #5f6676;
          font-size: .96rem;
          line-height: 1.82;
        }

        .terms-clause p:last-child {
          margin-bottom: 0;
        }

        .terms-final-note {
          margin-top: 34px;
          padding: 20px 22px;
          border-radius: 16px;
          background: #130150;
          color: rgba(255,255,255,.82);
          line-height: 1.7;
        }

        .terms-final-note strong {
          color: #fff;
        }

        @media (max-width: 900px) {
          .terms-shell {
            grid-template-columns: 1fr;
          }

          .terms-nav {
            position: static;
            display: flex;
            overflow-x: auto;
            gap: 8px;
          }

          .terms-nav strong {
            display: none;
          }

          .terms-nav a {
            flex: 0 0 auto;
            white-space: nowrap;
          }
        }

        @media (max-width: 600px) {
          .terms-page {
            padding: 42px 0 64px;
          }

          .terms-meta {
            grid-template-columns: 1fr;
          }

          .terms-intro {
            padding: 18px;
          }

          .terms-clause {
            padding-bottom: 24px;
            margin-bottom: 24px;
          }
        }
      `}</style>

      <section className="page-hero">
        <div className="container narrow">
          <span className="eyebrow">Legal & commercial framework</span>
          <h1>Terms & Conditions</h1>
          <p>
            Comprehensive terms governing Digitalness website use, professional
            services, payments, project delivery, marketing activity, technology
            development, intellectual property, data handling, risk allocation
            and dispute procedures.
          </p>
        </div>
      </section>

      <section className="terms-page">
        <div className="container terms-shell">
          <nav className="terms-nav" aria-label="Terms and conditions sections">
            <strong>On this page</strong>
            {TERM_GROUPS.map((group) => (
              <a href={`#${group.id}`} key={group.id}>
                {group.title}
              </a>
            ))}
          </nav>

          <div className="terms-content">
            <div className="terms-meta">
              <div><strong>Company:</strong> Digitalness Industries LLP</div>
              <div><strong>Effective date:</strong> 26 October 2026</div>
              <div><strong>Version:</strong> 2.0 — Expanded Master Terms</div>
              <div><strong>Website:</strong> digitalness.co.in</div>
              <div><strong>Email:</strong> info@digitalness.co.in</div>
              <div><strong>WhatsApp:</strong> +91 9989329642</div>
              <div><strong>Support:</strong> +91 404 5369584</div>
            </div>

            <div className="terms-intro">
              These Terms are intended to provide the general legal and
              commercial framework for Digitalness Industries LLP. A paid
              engagement is governed by the documents actually accepted for
              that project, including any signed agreement, statement of work,
              quotation, data-processing terms or other incorporated terms.
              Accessing the website alone does not create a paid service
              contract.
            </div>

            {TERM_GROUPS.map((group) => (
              <section
                className="terms-group"
                id={group.id}
                key={group.id}
              >
                <h2>{group.title}</h2>

                {group.clauses.map((clause) => (
                  <div
                    className="terms-clause"
                    key={clause.number}
                  >
                    <div className="terms-clause-title">
                      <span className="terms-clause-number">
                        {String(clause.number).padStart(2, '0')}
                      </span>

                      <span>{clause.title}</span>
                    </div>

                    {clause.paragraphs.map((paragraph, index) => (
                      <p key={`${clause.number}-${index}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </section>
            ))}

            <div className="terms-final-note">
              <strong>Verification still required:</strong> the supplied master
              terms intentionally leave the registered office address and LLPIN
              as placeholders. Those two fields should be replaced only with
              verified company records before publication.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
