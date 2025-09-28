export * from './experience';
export * from './project';
export * from './contact';
export * from './about';
export * from './nav';
export * from './footer';
export * from './pageInfo';

/* Global Props */
export type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};
