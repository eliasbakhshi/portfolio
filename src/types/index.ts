export * from './experience';
export * from './project';
export * from './contact';
export * from './about';
export * from './nav';

/* Global Props */
export type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};
