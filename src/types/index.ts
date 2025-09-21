export * from './experience';
export * from './project';
export * from './contentful';

/* Global Props */
export type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};
