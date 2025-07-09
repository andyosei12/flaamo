"use client";

export const MyGroups = () => {
  const groups = [
    { name: "Susu Squad", role: "Member", amount: "GHS 120" },
    { name: "Family Fund", role: "Creator", amount: "GHS 300" },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium">My Groups</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
        {groups.map((g) => (
          <div
            key={g.name}
            className="min-w-[220px] flex-shrink-0 p-4 bg-background border rounded-lg shadow-sm"
          >
            <div className="font-semibold text-sm truncate">{g.name}</div>
            <div className="text-xs text-muted-foreground">{g.role}</div>
            <div className="mt-2 text-brand font-medium">{g.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
