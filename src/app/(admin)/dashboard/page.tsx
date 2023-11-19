import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SalesDashboard from './(dashboards)/Sales';
import FieldDashboard from './(dashboards)/Field';

export default async function DashboardLayout() {
  return (
    <div className="flex flex-col flex-1 px-14 py-12 bg-background-dashboard">
      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="field">Field</TabsTrigger>
        </TabsList>
        <TabsContent value="sales">
          <SalesDashboard />
        </TabsContent>
        <TabsContent value="field">
          <FieldDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
