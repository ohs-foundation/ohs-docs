---
title: "Open Health Stack  |  Google for Developers"
original_url: "https://developers.google.com/open-health-stack/stories/iprd"
source: "ohs.dev (Google for Developers Open Health Stack)"
---

# Open Health Stack  |  Google for Developers

/\* Styles inlined from /open-health-stack/styles/ohs.css \*/
.ohs-padding-large-top {
padding-top: 96px !important;
}
.ohs-padding-large-bottom {
padding-bottom: 96px !important;
}
.ohs-padding-large {
padding-top: 96px !important;
padding-bottom: 96px !important;
}
.ohs-design-padding-top {
padding-top: 64px !important;
}
.ohs-design-padding-bottom {
padding-bottom: 40px !important;
}
.ohs-padding-xsmall-bottom {
padding-bottom: 32px !important;
}
.ohs-caption {
font-size: 0.875em;
}

## IPRD's Impact Health app paves the way for real-time population health insights in Nigeria

![](../images/iprd-hero.png)

Health workers use the Impact Health app in Oyo state, Nigeria.

### Context

Nigeria has extremely high rates of maternal mortality, accounting for an estimated 20% of all global maternal deaths according to the WHO. Oyo and Osun states, together home to a population over 10 million, are no exception. A major contributor is poor access to health services and limited health literacy, especially in rural and remote regions. The Ministry of Health is investing in primary health care facilities staffed with skilled birth attendants; however, these facilities use paper records and registries to track case load. This makes it difficult to standardize care and monitor service delivery across the region. Public health officials in Oyo and Osun were seeking ways to modernize the digital health infrastructure in their states.

### Solution

In partnership with Hacey Health Initiative and Google's Open Health Stack team, IPRD Solutions developed a FHIR-native app called 'Impact Health' that supports primary health clinics to deliver antenatal care with digital record-keeping. The app was designed using a ['Continuous Innovation Methodology'](https://www.iprdsolutions.com/continuous-innovation-methodology) with close engagement from a cross-disciplinary group including local clinicians, patients, Health Ministry officials and funders. The health care worker app allows patient registration, recording of examination and test results, and a schedule of past and upcoming appointments.

One innovation is the integration of QR codes (using [OCL technology](https://opencampaignlink.org/)), which are given to the patient via SMS message or in printed form, and which can then be used by the health care worker to look up their record on the next visit. In addition, IPRD has developed a dashboard to surface real-time indicator metrics to help the Ministry better understand care delivery across a region. This is important for resource allocation and quality reporting.

![](../images/iprd-2up-right.png)

QR codes are given to the patient to find their records next time.

### How OHS helped

Working with the Android FHIR SDK significantly sped up development time. The FHIR-native data capture and offline-capable sync were particularly useful given the patchy mobile connectivity. The SDK enabled configuration of data collection screens and content by subject matter experts rather than developers, ensuring that app content was tailored for the clinical use case. The Open Health Stack’s Analytics framework is able to link up to any FHIR server or FHIR store and convert the data into parquet files which are efficient to query. With the increase in app users, we see this as an essential piece to build responsive and useful dashboards.

IPRD estimates that Open Health Stack building blocks helped cut development time in half. FHIR solves a lot of the issues that come with building health apps. The flexibility (by means of profiles and extensions) enables easy local customization in a way that still preserves interoperability. Since FHIR has an increasingly strong community support group and documentation, onboarding new developers also becomes easier.

## "Data that used to take two months to aggregate and multiple road trips to reach the state is now available in one day."

-IPRD Nigeria team

![](../images/iprd-screenshots.png)

Not real patient information.

### Impact

Feedback from healthcare workers is that the app saves them a lot of time versus managing paper records. They also appreciated that the case registry was populated digitally and could be sent to the Ministry at the end of each month instead of trying to tally paper files.

### Next steps

In the near term, dashboards built by IPRD will be used to provide real time insights to local and state Ministries of Health. IPRD is also planning on building both scope and scale, adding a broader portfolio of use cases in clinics, and expanding into clinics across Nigeria.

[![](../images/iprd-solutions-logo.png)](https://www.iprdsolutions.com/)

![](../images/impact-health-logo.png)

[![](../images/hacey-logo.png)](https://hacey.org/)
