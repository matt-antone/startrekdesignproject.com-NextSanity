import Link from "next/link";

const BreadcrumbItem = ({ children, href, className = '', isCurrent = false, ...props }) => {
  return (
    <li className={`flex ${className} space-x-4`}>
      <span className="flex items-center gap-4">
        <Link 
          href={href} 
          passHref 
          aria-current={isCurrent ? "page" : "false"}
          className={`uppercase text-sm lg:text-base ${ isCurrent ? "text-content line-clamp-1 w-64" : "text-secondary"}`}>
          {children}
        </Link>
        {isCurrent ? "" : (
          <span className="">/</span>
        )}
      </span>
    </li>
  );
};

export default BreadcrumbItem;
