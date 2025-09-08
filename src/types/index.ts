export * from './experience';
export * from './project';

/* Global Props */
export type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};
