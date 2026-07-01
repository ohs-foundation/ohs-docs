import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'FHIR-Native',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Every OHS component speaks HL7® FHIR® natively, from the Android SDK to the
        server-side gateway and data pipeline tools.
      </>
    ),
  },
  {
    title: 'Multiplatform',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Kotlin Multiplatform libraries like kotlin-fhir and kotlin-fhirpath let you
        share FHIR logic across Android, iOS, and server targets.
      </>
    ),
  },
  {
    title: 'Reference Implementation Included',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        OHS Player shows every layer — backend, web portal, client app, and
        analytics — wired together end-to-end.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
