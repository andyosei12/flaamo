import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, CalendarDays, AlertCircle } from "lucide-react"; // or wherever your user info comes from

interface GroupSummaryProps {
  totalDues: string;
  totalCollected: string;
  outstandingBalance: string;
  role: string;
}

const GroupSummary = ({
  totalDues,
  totalCollected,
  outstandingBalance,
  role,
}: GroupSummaryProps) => {
  return (
    <section className="mt-6 space-y-6">
      {/* Summary Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          Group Summary
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Dues */}
        <Card className="px-3 py-2 md:px-6 md:py-4">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <CalendarDays size={16} className="md:size-5" />
              Total Dues
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xl md:text-2xl font-semibold">{totalDues}</p>
          </CardContent>
        </Card>

        <Card className="px-3 py-2 md:px-6 md:py-4">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <Wallet size={16} className="md:size-5" />
              Total Collected
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xl md:text-2xl font-semibold">
              ₵{totalCollected}
            </p>
          </CardContent>
        </Card>

        {/* Only creators */}
        {role !== "member" && (
          <Card className="px-3 py-2 md:px-6 md:py-4">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                <AlertCircle size={16} className="md:size-5" />
                Outstanding Dues
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-xl md:text-2xl font-semibold text-red-500">
                ₵{outstandingBalance}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default GroupSummary;
