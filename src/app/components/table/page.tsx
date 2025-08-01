"use client";

import React, { useState } from "react";
import { Table } from "@/lib/components/Table";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { Button } from "@/lib/components/Button";
import {
  Copy,
  Check,
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  Search,
  Package,
  Users,
  TrendingUp,
  Award,
  Shield,
  Zap,
} from "lucide-react";

export default function TablePage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [density, setDensity] = useState("comfortable");
  const [withBorder, setWithBorder] = useState(false);
  const [withColumnBorders, setWithColumnBorders] = useState(false);
  const [striped, setStriped] = useState(false);
  const [hoverable, setHoverable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchable, setSearchable] = useState(true);
  const [selectable, setSelectable] = useState(true);
  const [expandable, setExpandable] = useState(false);
  const [withPagination, setWithPagination] = useState(true);
  const [withFooter, setWithFooter] = useState(false);

  // Demo state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecords, setSelectedRecords] = useState<(string | number)[]>([]);
  const [expandedRecords, setExpandedRecords] = useState<(string | number)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortState, setSortState] = useState<any>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("demo");

  // Size labels for slider
  const sizeLabels = ["xs", "sm", "md", "lg", "xl"];
  const sizeValues = ["sm", "md", "lg", "xl"];

  const copyCode = async (code: string, key: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  // Sample data
  const sampleData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      role: "Software Engineer",
      department: "Engineering",
      salary: 95000,
      joinDate: "2023-01-15",
      status: "Active",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face",
      rating: 4.8,
      projects: 12,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      role: "Product Manager",
      department: "Product",
      salary: 110000,
      joinDate: "2022-08-20",
      status: "Active",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      projects: 8,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 (555) 345-6789",
      location: "Austin, TX",
      role: "UX Designer",
      department: "Design",
      salary: 85000,
      joinDate: "2023-03-10",
      status: "Active",
      avatar:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=100&h=100&fit=crop&crop=face",
      rating: 4.7,
      projects: 15,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phone: "+1 (555) 456-7890",
      location: "Seattle, WA",
      role: "Data Scientist",
      department: "Analytics",
      salary: 105000,
      joinDate: "2022-11-05",
      status: "On Leave",
      avatar:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=100&h=100&fit=crop&crop=face",
      rating: 4.6,
      projects: 6,
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@example.com",
      phone: "+1 (555) 567-8901",
      location: "Chicago, IL",
      role: "DevOps Engineer",
      department: "Engineering",
      salary: 98000,
      joinDate: "2023-02-28",
      status: "Active",
      avatar:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100&h=100&fit=crop&crop=face",
      rating: 4.5,
      projects: 10,
    },
  ];

  // Table columns
  const columns = [
    {
      accessor: "name",
      title: "Employee",
      sortable: true,
      render: (value: any, record: any) => (
        <div className="flex items-center gap-3">
          <img
            src={record.avatar}
            alt={record.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{record.name}</div>
            <div className="text-sm text-gray-500">{record.role}</div>
          </div>
        </div>
      ),
    },
    {
      accessor: "email",
      title: "Contact",
      sortable: true,
      render: (value: any, record: any) => (
        <div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-gray-400" />
            <span>{record.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>{record.phone}</span>
          </div>
        </div>
      ),
    },
    {
      accessor: "location",
      title: "Location",
      sortable: true,
      render: (value: any) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      accessor: "department",
      title: "Department",
      sortable: true,
      render: (value: any) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value === "Engineering"
              ? "bg-blue-100 text-blue-800"
              : value === "Product"
              ? "bg-green-100 text-green-800"
              : value === "Design"
              ? "bg-purple-100 text-purple-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      accessor: "salary",
      title: "Salary",
      sortable: true,
      textAlign: "right" as const,
      render: (value: any) => (
        <span className="font-medium text-gray-900">
          ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      ),
    },
    {
      accessor: "status",
      title: "Status",
      sortable: true,
      render: (value: any) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value === "Active"
              ? "bg-green-100 text-green-800"
              : value === "On Leave"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              value === "Active"
                ? "bg-green-500"
                : value === "On Leave"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          />
          {value}
        </span>
      ),
    },
    {
      accessor: "rating",
      title: "Rating",
      sortable: true,
      textAlign: "center" as const,
      render: (value: any) => (
        <div className="flex items-center justify-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{value}</span>
        </div>
      ),
    },
    {
      accessor: "actions",
      title: "Actions",
      render: (value: any, record: any) => (
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-100 rounded" title="View">
            <Eye className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
            <Edit className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded" title="Delete">
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  const generateCode = () => {
    const props = [];
    if (variant !== "default") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (density !== "comfortable") props.push(`density="${density}"`);
    if (withBorder) props.push("withBorder");
    if (withColumnBorders) props.push("withColumnBorders");
    if (striped) props.push("striped");
    if (!hoverable) props.push("hoverable={false}");
    if (loading) props.push("loading");
    if (searchable) props.push("searchable");

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Table } from '@beeui';

const sampleColumns = [
  {
    accessor: 'name',
    title: 'Name',
    sortable: true,
    render: (value, record) => (
      <div className="flex items-center gap-3">
        <img src={record.avatar} className="w-8 h-8 rounded-full" />
        <div>
          <div className="font-medium">{record.name}</div>
          <div className="text-sm text-gray-500">{record.role}</div>
        </div>
      </div>
    )
  },
  // ... more columns
];

<Table
  data={data}
  columns={columns}${propsString}
  ${
    selectable
      ? `selection={{
    mode: 'multiple',
    selectedRecords: selectedRecords,
    onSelectionChange: setSelectedRecords
  }}`
      : ""
  }
  ${
    withPagination
      ? `pagination={{
    page: currentPage,
    pageSize: pageSize,
    total: data.length,
    onPageChange: setCurrentPage,
    onPageSizeChange: setPageSize
  }}`
      : ""
  }
  ${
    searchable
      ? `searchQuery={searchQuery}
  onSearchChange={setSearchQuery}`
      : ""
  }
/>`;
  };

  const CodeSection = ({
    code,
    title,
    sectionKey,
  }: {
    code: string;
    title: string;
    sectionKey: string;
  }) => {
    const isCopied = copiedStates[sectionKey];

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm font-medium text-gray-700">{title}</span>
          </div>
          <button
            onClick={() => copyCode(code, sectionKey)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
          >
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {isCopied ? "Copied!" : "Copy"}
            </span>
          </button>
        </div>
        <pre className="p-4 text-sm overflow-x-auto bg-gray-50 rounded-b-lg">
          <code className="text-gray-800 leading-relaxed font-mono">
            {code}
          </code>
        </pre>
      </div>
    );
  };

  // Select data
  const variantOptions = [
    { value: "default", label: "Default" },
    { value: "striped", label: "Striped" },
    { value: "bordered", label: "Bordered" },
    { value: "minimal", label: "Minimal" },
    { value: "elevated", label: "Elevated" },
  ];

  const densityOptions = [
    { value: "compact", label: "Compact" },
    { value: "comfortable", label: "Comfortable" },
    { value: "spacious", label: "Spacious" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Table</h1>
          <p className="text-gray-600">
            Highly optimized data table with sorting, filtering, pagination, and
            advanced features
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
            <button
              onClick={() => setActiveTab("demo")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "demo"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Interactive Demo
            </button>
            <button
              onClick={() => setActiveTab("data")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "data"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Dummy Data
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "demo" && (
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8 mb-8">
              {/* Table View Section - Full Width */}
              <div className="mb-8">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <Table
                    data={sampleData}
                    columns={columns}
                    variant={variant as any}
                    size={size as any}
                    density={density as any}
                    withBorder={withBorder}
                    withColumnBorders={withColumnBorders}
                    striped={striped}
                    hoverable={hoverable}
                    loading={loading}
                    searchable={searchable}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selection={
                      selectable
                        ? {
                            mode: "multiple",
                            selectedRecords: selectedRecords,
                            onSelectionChange: setSelectedRecords,
                            getRecordId: (record) => record.id,
                          }
                        : undefined
                    }
                    expandable={expandable}
                    expandedRecords={expandedRecords}
                    onExpandedRecordsChange={setExpandedRecords}
                    renderExpandedRow={(record) => (
                      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Additional Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">Join Date:</span>{" "}
                              {record.joinDate}
                            </div>
                            <div>
                              <span className="font-medium">Projects:</span>{" "}
                              {record.projects}
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Performance
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">Rating:</span>{" "}
                              {record.rating}/5.0
                            </div>
                            <div>
                              <span className="font-medium">Department:</span>{" "}
                              {record.department}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    pagination={
                      withPagination
                        ? {
                            page: currentPage,
                            pageSize: pageSize,
                            total: sampleData.length,
                            onPageChange: setCurrentPage,
                            onPageSizeChange: setPageSize,
                          }
                        : undefined
                    }
                    sort={sortState}
                    onSortChange={setSortState}
                    onRowClick={(record) => console.log("Row clicked:", record)}
                    withFooter={withFooter}
                  />
                </div>
              </div>

              {/* Controls Section - Below Table */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Controls
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Main Controls */}
                  <div className="space-y-6">
                    {/* Variant */}
                    <div>
                      <Select
                        data={variantOptions}
                        value={variant}
                        onChange={(value) => setVariant(value as string)}
                        label="Variant"
                        size="sm"
                      />
                    </div>

                    {/* Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Size: {size} ({sizeLabels[sizeValues.indexOf(size)]})
                      </label>
                      <div className="pr-2">
                        <input
                          type="range"
                          min="0"
                          max="3"
                          value={sizeValues.indexOf(size)}
                          onChange={(e) =>
                            setSize(sizeValues[parseInt(e.target.value)])
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {sizeLabels.slice(1).map((label) => (
                            <span key={label} className="text-center">
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Density */}
                    <div>
                      <Select
                        data={densityOptions}
                        value={density}
                        onChange={(value) => setDensity(value as string)}
                        label="Density"
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Right Column: Feature Toggles and Actions */}
                  <div className="space-y-6">
                    {/* Feature Toggles */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Features</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Checkbox
                          checked={withBorder}
                          onChange={setWithBorder}
                          label="With border"
                          size="sm"
                        />
                        <Checkbox
                          checked={withColumnBorders}
                          onChange={setWithColumnBorders}
                          label="Column borders"
                          size="sm"
                        />
                        <Checkbox
                          checked={striped}
                          onChange={setStriped}
                          label="Striped rows"
                          size="sm"
                        />
                        <Checkbox
                          checked={hoverable}
                          onChange={setHoverable}
                          label="Hoverable"
                          size="sm"
                        />
                        <Checkbox
                          checked={loading}
                          onChange={setLoading}
                          label="Loading"
                          size="sm"
                        />
                        <Checkbox
                          checked={searchable}
                          onChange={setSearchable}
                          label="Searchable"
                          size="sm"
                        />
                        <Checkbox
                          checked={selectable}
                          onChange={setSelectable}
                          label="Selectable"
                          size="sm"
                        />
                        <Checkbox
                          checked={expandable}
                          onChange={setExpandable}
                          label="Expandable"
                          size="sm"
                        />
                        <Checkbox
                          checked={withPagination}
                          onChange={setWithPagination}
                          label="Pagination"
                          size="sm"
                        />
                        <Checkbox
                          checked={withFooter}
                          onChange={setWithFooter}
                          label="With footer"
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Actions</h4>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          leftIcon={<Download />}
                          onClick={() => console.log("Export data")}
                        >
                          Export Data
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          fullWidth
                          leftIcon={<Filter />}
                          onClick={() => console.log("Advanced filters")}
                        >
                          Advanced Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Dummy Data for Testing</h3>
              
              <div className="space-y-6">
                {/* Employee Data */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Employee Data (JSON)</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{`const employeeData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    role: "Software Engineer",
    department: "Engineering",
    salary: 95000,
    joinDate: "2023-01-15",
    status: "Active",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face",
    rating: 4.8,
    projects: 12,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    role: "Product Manager",
    department: "Product",
    salary: 110000,
    joinDate: "2022-08-20",
    status: "Active",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face",
    rating: 4.9,
    projects: 8,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    role: "UX Designer",
    department: "Design",
    salary: 85000,
    joinDate: "2023-03-10",
    status: "Active",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=100&h=100&fit=crop&crop=face",
    rating: 4.7,
    projects: 15,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    role: "Data Scientist",
    department: "Analytics",
    salary: 105000,
    joinDate: "2022-11-05",
    status: "On Leave",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=100&h=100&fit=crop&crop=face",
    rating: 4.6,
    projects: 6,
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 567-8901",
    location: "Chicago, IL",
    role: "DevOps Engineer",
    department: "Engineering",
    salary: 98000,
    joinDate: "2023-02-28",
    status: "Active",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100&h=100&fit=crop&crop=face",
    rating: 4.5,
    projects: 10,
  },
];`}</code>
                    </pre>
                  </div>
                </div>

                {/* Chemical Elements Data */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Chemical Elements Data (JSON)</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{`const chemicalElementsData = [
  {
    id: 1,
    position: 6,
    name: "Carbon",
    symbol: "C",
    atomicMass: 12.011,
    category: "Nonmetal",
    discoveredBy: "Antoine Lavoisier",
    yearDiscovered: 1789,
  },
  {
    id: 2,
    position: 7,
    name: "Nitrogen",
    symbol: "N",
    atomicMass: 14.007,
    category: "Nonmetal",
    discoveredBy: "Daniel Rutherford",
    yearDiscovered: 1772,
  },
  {
    id: 3,
    position: 39,
    name: "Yttrium",
    symbol: "Y",
    atomicMass: 88.906,
    category: "Transition Metal",
    discoveredBy: "Johan Gadolin",
    yearDiscovered: 1794,
  },
  {
    id: 4,
    position: 56,
    name: "Barium",
    symbol: "Ba",
    atomicMass: 137.33,
    category: "Alkaline Earth Metal",
    discoveredBy: "Carl Wilhelm Scheele",
    yearDiscovered: 1774,
  },
  {
    id: 5,
    position: 58,
    name: "Cerium",
    symbol: "Ce",
    atomicMass: 140.12,
    category: "Lanthanide",
    discoveredBy: "Martin Klaproth",
    yearDiscovered: 1803,
  },
];`}</code>
                    </pre>
                  </div>
                </div>

                {/* Column Definitions */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Column Definitions (React)</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{`const employeeColumns = [
  {
    accessor: "name",
    title: "Employee",
    sortable: true,
    render: (value, record) => (
      <div className="flex items-center gap-3">
        <img
          src={record.avatar}
          alt={record.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <div className="font-medium text-gray-900">{record.name}</div>
          <div className="text-sm text-gray-500">{record.role}</div>
        </div>
      </div>
    ),
  },
  {
    accessor: "email",
    title: "Contact",
    sortable: true,
    render: (value, record) => (
      <div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-gray-400" />
          <span>{record.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
          <Phone className="w-4 h-4 text-gray-400" />
          <span>{record.phone}</span>
        </div>
      </div>
    ),
  },
  {
    accessor: "department",
    title: "Department",
    sortable: true,
    render: (value) => (
      <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium \${
        value === "Engineering"
          ? "bg-blue-100 text-blue-800"
          : value === "Product"
          ? "bg-green-100 text-green-800"
          : value === "Design"
          ? "bg-purple-100 text-purple-800"
          : "bg-gray-100 text-gray-800"
      }\`}>
        {value}
      </span>
    ),
  },
  {
    accessor: "salary",
    title: "Salary",
    sortable: true,
    textAlign: "right",
      render: (value) => (
    <span className="font-medium text-gray-900">
      \${value.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")}
    </span>
  ),
  },
];`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <CodeSection
              code={generateCode()}
              title="Demo.tsx"
              sectionKey="interactive-demo"
            />
          </div>
        </section>

        {/* Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Variants
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Default
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Table
                  data={sampleData.slice(0, 3)}
                  columns={columns.slice(0, 4)}
                  variant="default"
                  size="sm"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Striped
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Table
                  data={sampleData.slice(0, 3)}
                  columns={columns.slice(0, 4)}
                  variant="striped"
                  size="sm"
                  withBorder={false}
                  withColumnBorders={false}
                  hoverable={false}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Bordered
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Table
                  data={sampleData.slice(0, 3)}
                  columns={columns.slice(0, 4)}
                  variant="bordered"
                  size="sm"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Elevated
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Table
                  data={sampleData.slice(0, 3)}
                  columns={columns.slice(0, 4)}
                  variant="elevated"
                  size="sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Table variant="default" data={data} columns={columns} />
<Table variant="striped" data={data} columns={columns} />
<Table variant="bordered" data={data} columns={columns} />
<Table variant="elevated" data={data} columns={columns} />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Advanced Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Search & Filter
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Built-in search functionality with highlighting and
                column-specific filtering options.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Sorting</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Multi-column sorting with custom sort functions and visual
                indicators.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Selection
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Single and multiple row selection with keyboard shortcuts and
                bulk actions.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Pagination
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Server-side and client-side pagination with customizable page
                sizes and navigation.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Performance
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Virtual scrolling for large datasets and optimized rendering for
                smooth interactions.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Accessibility
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Full ARIA support, keyboard navigation, and screen reader
                compatibility.
              </p>
            </div>
          </div>
        </section>

        {/* Real-World Examples Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Real-World Examples
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Employee Directory
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Table
                  data={sampleData}
                  columns={columns}
                  variant="elevated"
                  searchable
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selection={{
                    mode: "multiple",
                    selectedRecords: selectedRecords,
                    onSelectionChange: setSelectedRecords,
                    getRecordId: (record) => record.id,
                  }}
                  pagination={{
                    page: currentPage,
                    pageSize: pageSize,
                    total: sampleData.length,
                    onPageChange: setCurrentPage,
                    onPageSizeChange: setPageSize,
                  }}
                  sort={sortState}
                  onSortChange={setSortState}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`// Employee Directory Example
<Table
  data={employees}
  columns={employeeColumns}
  variant="elevated"
  searchable
  selection={{ mode: 'multiple' }}
  pagination={{ page: 1, pageSize: 10, total: 100 }}
  onRowClick={(employee) => viewEmployee(employee)}
/>`}
              title="Demo.tsx"
              sectionKey="examples"
            />
          </div>
        </section>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
