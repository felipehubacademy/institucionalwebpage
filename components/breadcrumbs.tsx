import Link from "next/link"
import type React from "react"
interface BreadcrumbItem {
  label: string
  href?: string
  isCurrent?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 text-sm text-gray-500">
        {items.map((item, index) => (
          <li className="inline-flex items-center" key={index}>
            {item.href && !item.isCurrent ? (
              <>
                <Link href={item.href} className="text-[#161533] hover:text-[#a3ff3c]">
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <svg
                    className="ms-2.5 h-3 w-3 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 15"
                  >
                    <path
                      d="M1 7.5h11"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </>
            ) : (
              <>
                <span aria-current="page" className="ms-1 text-[#a3ff3c]">
                  {item.label}
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
