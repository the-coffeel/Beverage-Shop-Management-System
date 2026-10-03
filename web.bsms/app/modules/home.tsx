import type { Route } from './+types/home';
import DashboardPage from './dashboard';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Dashboard | BSMS' },
        {
            name: 'description',
            content: 'Beverage shop sales, purchasing, and stock overview.',
        },
    ];
}

export default function Home() {
    return <DashboardPage />;
}
