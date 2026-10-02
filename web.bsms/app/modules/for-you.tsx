import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { Button } from "@/components/ui/button";
import { MessageSquareText, Rocket, Sparkles, X } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

const tabs = [
  { label: "Recommended", value: "recommendedActions" },
  { label: "Assigned to me", value: "assignedToMe" },
  { label: "Starred", value: "starred" },
  { label: "Worked on", value: "workedOn" },
  { label: "Viewed", value: "viewed" },
];

export function meta() {
  return [
    { title: "For you - Recommendations" },
    { name: "description", content: "Personalized recommendations for you." },
  ];
}

export default function ForYouPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = searchParams.get("tab");
  const activeTab =
    tabs.some((tab) => tab.value === currentTab) ? currentTab : "recommendedActions";

  useEffect(() => {
    if (!currentTab || !tabs.some((tab) => tab.value === currentTab)) {
      setSearchParams({ tab: "recommendedActions" }, { replace: true });
    }
  }, [currentTab, setSearchParams]);

  const handleTabChange = (tabValue: string) => {
    setSearchParams({ tab: tabValue });
  };

  return (
    <DashboardShell>
      <main className="min-h-screen bg-background p-4 text-foreground">
        <div className="">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Recommended spaces
            </h2>

            <button
              type="button"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View all spaces
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {/* cards */}
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <h1 className="text-xl font-semibold tracking-tight mb-4">
              For you
            </h1>

            <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 p-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.value;

                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => handleTabChange(tab.value)}
                    className={[
                      "rounded-md px-3 text-sm font-medium transition-colors",
                      isActive
                        ? "border border-blue-400 bg-background text-blue-600"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {tab.label}
                    {tab.value === "assignedToMe" && (
                      <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-md bg-muted px-1.5 py-0.5 text-xs text-foreground">
                        1
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border bg-card shadow-sm">
            <div className="flex items-center justify-between gap-4 p-5">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl border bg-[#f7ecfa] shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f4c84d] text-[#1f2937]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-[1.05rem] font-semibold">
                    Track and resolve support issues, fast
                  </h3>

                  <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                    When you use Jira and Jira Service Management together,
                    you can track and resolve requests in one place.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-border bg-background px-3 py-2 text-sm font-medium"
                >
                  Try it
                </Button>

                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Close recommendation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <MessageSquareText className="h-4 w-4" />
              Give us feedback
            </button>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}