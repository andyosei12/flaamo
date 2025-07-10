export function isNavLinkActive(pathname: string, href: string): boolean {
  const cleanPath = pathname.split("?")[0];

  // Exact match for /dashboard
  if (href === "/dashboard") {
    return cleanPath === "/dashboard";
  }

  // Match route and any subpaths, like /dashboard/groups or /dashboard/groups/abc
  return cleanPath === href || cleanPath.startsWith(`${href}/`);
}
