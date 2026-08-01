import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calculator,
  FileText,
  Building2,
  BookOpen,
  CalendarDays,
  Newspaper,
  Scale,
  ChevronDown,
  ClipboardCheck,
  LucideIcon,
} from 'lucide-react';

interface ChildItem {
  to: string;
  label: string;
}

interface SectionItem {
  to?: string;
  icon: LucideIcon;
  label: string;
  exact?: boolean;
  base?: string;
  children?: ChildItem[];
}

const sections: SectionItem[] = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', exact: true },

  {
    icon: Calculator,
    label: 'Income Tax',
    base: '/income-tax',
    children: [
      { to: '/income-tax/slabs', label: 'Tax Slabs' },
      { to: '/income-tax/deductions', label: 'Deductions' },
      { to: '/income-tax/tds', label: 'TDS Rates' },
      { to: '/income-tax/itr', label: 'ITR Forms' },
      { to: '/income-tax/advance-tax', label: 'Advance Tax' },
    ],
  },

  {
    icon: FileText,
    label: 'GST',
    base: '/gst',
    children: [
      { to: '/gst/rates', label: 'Rate Structure' },
      { to: '/gst/returns', label: 'GSTR Returns' },
      { to: '/gst/itc', label: 'Input Tax Credit' },
      { to: '/gst/rcm', label: 'Reverse Charge' },
      { to: '/gst/registration', label: 'Registration' },
    ],
  },

  {
    icon: Building2,
    label: 'Company Law',
    base: '/company-law',
    children: [
      { to: '/company-law/types', label: 'Company Types' },
      { to: '/company-law/filings', label: 'ROC Filings' },
      { to: '/company-law/meetings', label: 'Meetings' },
      { to: '/company-law/csr', label: 'CSR Rules' },
    ],
  },

  {
    icon: BookOpen,
    label: 'Standards',
    base: '/accounting-standards',
    children: [
      { to: '/accounting-standards/indas', label: 'Ind AS' },
      { to: '/accounting-standards/as', label: 'Accounting Stds' },
      { to: '/accounting-standards/sa', label: 'Auditing Stds' },
      { to: '/accounting-standards/caro', label: 'CARO 2020' },
      { to: '/accounting-standards/icds', label: 'ICDS' },
    ],
  },

  { to: '/compliance-calendar', icon: CalendarDays, label: 'Due Dates' },
  { to: '/calculators', icon: Scale, label: 'Calculators' },
  { to: '/forms', icon: FileText, label: 'Form Repository' },
  { to: '/audit-checklist', icon: ClipboardCheck, label: 'Audit Checklist' },
  { to: '/news', icon: Newspaper, label: 'News & Updates' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isParentActive = (parent: SectionItem) => {
    if (!parent.children) return false;
    return parent.children.some((c) => location.pathname === c.to);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-primary-500 text-white flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10 shrink-0">
          <div className="w-10 h-10 bg-accent-400 rounded-lg flex items-center justify-center text-white font-bold text-lg">CA</div>
          <div>
            <h1 className="text-white text-lg font-bold leading-tight">CA Portal</h1>
            <p className="text-white/60 text-xs">Accounting & Finance Hub</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto mt-2 px-3 space-y-0.5">
          {sections.map((item) => {
            if (!item.children && item.to) {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  onClick={() => { onClose(); }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`
                  }
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            }

            const active = isParentActive(item);
            const isOpen = expanded[item.label] || active;

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${active ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                >
                  <item.icon size={18} />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && item.children && (
                  <div className="ml-2 mt-0.5 mb-0.5 space-y-0.5 border-l-2 border-white/10 pl-4">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        end
                        onClick={() => { onClose(); }}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${isActive ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 shrink-0">
          <p className="text-[11px] text-white/40 text-center leading-relaxed">
            Latest amendments, notifications & circulars at your fingertips.
          </p>
        </div>
      </aside>
    </>
  );
}
