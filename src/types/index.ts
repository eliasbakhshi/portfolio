export * from './experience';
export * from './project';
export * from './contact';

/* Global Props */
export type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};
