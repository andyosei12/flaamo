"use client";

export const RecentActivity = () => {
  const logs = [
    "Paid GHS 100 to 'Susu Squad'",
    "Joined 'Hallmates 22'",
    "Created group 'Okyeman Union'",
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Recent Activity</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {logs.map((log, i) => (
          <li
            key={i}
            className="border-l-2 border-brand pl-3 leading-snug text-xs sm:text-sm"
          >
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
};
