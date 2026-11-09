import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Warehouse,
  Truck,
  ShoppingCart,
  BarChart3,
  Bell,
  Settings,
  Search,
  Plus,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Boxes,
  AlertTriangle,
  ScanBarcode,
  LogOut,
  Activity,
  Check,
  Eye,
  Trash2,
  Download,
  Filter,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  MoveRight,
  CircleDollarSign,
  Mail,
  Lock,
  CheckCircle2,
  Zap,
  ChartNoAxesCombined,
  Pencil,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import { initialProducts, suppliers, movements } from "./data";

const salesData = [
  { day: "Mon", sales: 3200, orders: 34 },
  { day: "Tue", sales: 4100, orders: 42 },
  { day: "Wed", sales: 3600, orders: 38 },
  { day: "Thu", sales: 5200, orders: 51 },
  { day: "Fri", sales: 4700, orders: 46 },
  { day: "Sat", sales: 6100, orders: 62 },
  { day: "Sun", sales: 5400, orders: 55 },
];

const emptyProduct = {
  name: "",
  category: "Electronics",
  sku: "",
  barcode: "",
  warehouse: "Main Warehouse",
  quantity: 0,
  minStock: 10,
  price: 0,
  supplier: "ScanPro Systems",
};

function App() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("stockwise_products");
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [loggedIn, setLoggedIn] = useState(
    () => localStorage.getItem("stockwise_logged_in") === "true"
  );

  const [adminName, setAdminName] = useState(
    () => localStorage.getItem("stockwise_admin_name") || "Shreelani"
  );

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("stockwise_dark") === "true"
  );

  const [rtl, setRtl] = useState(
    () => localStorage.getItem("stockwise_rtl") === "true"
  );

  const [workspaceName, setWorkspaceName] = useState(
    () =>
      localStorage.getItem("stockwise_workspace_name") ||
      "Acme Industries"
  );

  useEffect(() => {
    localStorage.setItem("stockwise_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem("stockwise_admin_name", adminName);
    localStorage.setItem("stockwise_dark", String(darkMode));
    localStorage.setItem("stockwise_rtl", String(rtl));
    localStorage.setItem("stockwise_workspace_name", workspaceName);
  }, [adminName, darkMode, rtl, workspaceName]);

  const login = () => {
    localStorage.setItem("stockwise_logged_in", "true");
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("stockwise_logged_in");
    setLoggedIn(false);
  };

  return (
    <>
      <style>{appearanceStyles}</style>

      <Routes>
        <Route
          path="/"
          element={
            <Landing
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              rtl={rtl}
              setRtl={setRtl}
            />
          }
        />

        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={login} />
            )
          }
        />

        <Route
          path="/dashboard/*"
          element={
            loggedIn ? (
              <Dashboard
                products={products}
                setProducts={setProducts}
                onLogout={logout}
                adminName={adminName}
                setAdminName={setAdminName}
                workspaceName={workspaceName}
                setWorkspaceName={setWorkspaceName}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                rtl={rtl}
                setRtl={setRtl}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

/* =========================================================
   LANDING PAGE
========================================================= */

function Landing({ darkMode, setDarkMode, rtl, setRtl }) {
  return (
    <div className="landing">
      <header className="site-header">
        <Link to="/" className="brand">
          <span className="brand-mark"><Boxes size={22} /></span>
          <span>stock<span className="brand-light">wise</span></span>
        </Link>

        <nav>
          <a href="#features">Features</a>
          <a href="#solutions">Solutions</a>
          <a href="#about">About us</a>
        </nav>

        <div className="header-actions">
          <AppearanceControls
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            rtl={rtl}
            setRtl={setRtl}
          />

          <Link to="/login" className="login-link">Log in</Link>
          <Link to="/login" className="button button-dark">
            Get started <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              INVENTORY, WITHOUT THE GUESSWORK
            </div>

            <h1>Every item.<br /><span>Always in sync.</span></h1>

            <p className="hero-copy">
              Take control of your inventory, streamline warehouse
              operations, and make every business decision with confidence.
            </p>

            <div className="hero-buttons">
              <Link to="/login" className="button button-dark button-large">
                Explore the dashboard <ArrowRight size={17} />
              </Link>

              <a href="#features" className="button button-outline button-large">
                Discover StockWise
              </a>
            </div>

            <div className="hero-proof">
              <div className="avatar-stack">
                <span>JD</span><span>MK</span><span>AR</span><span>+</span>
              </div>

              <div>
                <strong>Built for growing businesses</strong>
                <small>One clear view of your entire operation</small>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div
              className="hero-image"
              role="img"
              aria-label="Organized modern warehouse"
            />

            <div className="floating-card stock-float">
              <div className="float-icon"><Boxes size={17} /></div>
              <div>
                <small>Inventory accuracy</small>
                <strong>99.8%</strong>
              </div>
              <span className="positive">↑ 12.4%</span>
            </div>

            <div className="floating-card alert-float">
              <span className="alert-icon"><AlertTriangle size={17} /></span>
              <div>
                <strong>Stock alert resolved</strong>
                <small>Thermal label roll · Restocked</small>
              </div>
              <CheckCircle2 size={18} className="green-icon" />
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <span>POWERING BETTER OPERATIONS</span>
          <div>
            <strong>WAREHOUSE</strong>
            <strong>RETAIL</strong>
            <strong>WHOLESALE</strong>
            <strong>ECOMMERCE</strong>
            <strong>MANUFACTURING</strong>
          </div>
        </section>

        <section className="section features-section" id="features">
          <div className="section-heading">
            <div className="eyebrow">ONE PLATFORM. TOTAL CONTROL.</div>
            <h2>Everything you need to<br />keep business <span>moving.</span></h2>
            <p>
              Less time counting. More time growing. A smarter way to
              manage every part of your inventory.
            </p>
          </div>

          <div className="feature-grid">
            <Feature icon={<Activity />} number="01" title="Real-time inventory"
              text="Know exactly what you have, where it is, and when it needs attention." />
            <Feature icon={<ScanBarcode />} number="02" title="Barcode scanning"
              text="Speed up receiving, picking, and stock counts with barcode-ready workflows." />
            <Feature icon={<Truck />} number="03" title="Supplier & purchasing"
              text="Manage supplier relationships and purchase orders from one organized place." />
            <Feature icon={<Warehouse />} number="04" title="Multi-warehouse"
              text="Track stock across locations and move products with confidence." />
            <Feature icon={<Bell />} number="05" title="Smart stock alerts"
              text="Catch low stock and avoid costly stockouts before they happen." />
            <Feature icon={<ChartNoAxesCombined />} number="06" title="Reports & analytics"
              text="Turn stock movements and sales trends into better decisions." />
          </div>
        </section>

        <section className="workflow-section" id="solutions">
          <div className="workflow-image" />

          <div className="workflow-copy">
            <div className="eyebrow">YOUR OPERATIONS, CONNECTED</div>
            <h2>From receiving to shipping, <span>make every move count.</span></h2>

            <p>
              StockWise brings your products, people, and warehouses
              together in one clear workspace. Get the visibility you
              need to work faster and smarter.
            </p>

            <ul>
              <li><Check size={17} /> Know what is available across locations</li>
              <li><Check size={17} /> Simplify purchase and replenishment workflows</li>
              <li><Check size={17} /> Keep your team aligned with live updates</li>
            </ul>

            <Link to="/login" className="text-link">
              See how it works <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="cta-section" id="about">
          <div>
            <div className="eyebrow light-eyebrow">READY FOR A BETTER WAY?</div>
            <h2>Your inventory deserves<br />a little more <em>intelligence.</em></h2>
            <p>Bring clarity to your stockroom and confidence to your next move.</p>

            <Link to="/login" className="button button-white button-large">
              Launch StockWise <ArrowRight size={17} />
            </Link>
          </div>

          <div className="cta-decoration"><Boxes size={150} /></div>
        </section>
      </main>

      <footer className="site-footer">
        <Link to="/" className="brand">
          <span className="brand-mark"><Boxes size={20} /></span>
          <span>stock<span className="brand-light">wise</span></span>
        </Link>

        <span>© 2026 StockWise. Smarter inventory starts here.</span>

        <div>
          <a href="#features">Features</a>
          <a href="#solutions">Solutions</a>
          <Link to="/login">Dashboard</Link>
        </div>
      </footer>
    </div>
  );
}

function AppearanceControls({ darkMode, setDarkMode, rtl, setRtl }) {
  return (
    <div className="appearance-controls">
      <button
        type="button"
        className="appearance-btn"
        title={darkMode ? "Turn light mode on" : "Turn dark mode on"}
        aria-label="Toggle dark mode"
        onClick={() => setDarkMode(value => !value)}
      >
        {darkMode ? "☀️" : "🌙"}
        <span>{darkMode ? "Light" : "Dark"}</span>
      </button>

      <button
        type="button"
        className="appearance-btn"
        title="Toggle right-to-left layout"
        onClick={() => setRtl(value => !value)}
      >
        <span className="rtl-label">{rtl ? "LTR" : "RTL"}</span>
      </button>
    </div>
  );
}

function Feature({ icon, number, title, text }) {
  return (
    <article className="feature-card">
      <div className="feature-top">
        <span className="feature-icon">{icon}</span>
        <span>{number}</span>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <ArrowUpRight className="feature-arrow" size={19} />
    </article>
  );
}

/* =========================================================
   LOGIN
========================================================= */

function Login({ onLogin }) {
  const [email, setEmail] = useState("admin@stockwise.com");
  const [password, setPassword] = useState("stockwise123");
  const [error, setError] = useState("");

  const submit = event => {
    event.preventDefault();

    if (email.trim() && password.trim().length >= 4) {
      onLogin();
    } else {
      setError("Please enter a valid email and password (at least 4 characters).");
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="brand login-brand">
        <span className="brand-mark"><Boxes size={22} /></span>
        <span>stock<span className="brand-light">wise</span></span>
      </Link>

      <div className="login-layout">
        <div className="login-visual">
          <div className="login-visual-overlay">
            <div className="eyebrow light-eyebrow">INVENTORY, IN GOOD HANDS</div>
            <h1>Make room<br />for <em>better.</em></h1>
            <p>
              One workspace to keep your inventory organized, your team
              connected, and your business moving forward.
            </p>
          </div>
        </div>

        <div className="login-form-wrap">
          <div className="login-form">
            <span className="form-kicker">WELCOME BACK</span>
            <h2>Sign in to StockWise</h2>
            <p>Enter your details to access your workspace.</p>

            <form onSubmit={submit}>
              <label>
                Email address
                <div className="input-icon">
                  <Mail size={17} />
                  <input
                    type="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    required
                  />
                </div>
              </label>

              <label>
                Password
                <div className="input-icon">
                  <Lock size={17} />
                  <input
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    required
                  />
                </div>
              </label>

              {error && <p className="error-text">{error}</p>}

              <button className="button button-dark button-full" type="submit">
                Sign in to dashboard <ArrowRight size={17} />
              </button>
            </form>

            <div className="demo-note">
              <ShieldCheck size={17} />
              <span>
                <strong>Demo access</strong>
                <br />Use the pre-filled credentials to explore.
              </span>
            </div>

            <Link to="/" className="back-home">← Back to website</Link>
          </div>
        </div>
      </div>

      <div className="login-bottom">© 2026 StockWise · Secure workspace</div>
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  products,
  setProducts,
  onLogout,
  adminName,
  setAdminName,
  workspaceName,
  setWorkspaceName,
  darkMode,
  setDarkMode,
  rtl,
  setRtl,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Overview");

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");

  const [newProduct, setNewProduct] = useState(emptyProduct);

  const low = products.filter(
    product => product.quantity > 0 && product.quantity <= product.minStock
  ).length;

  const out = products.filter(product => product.quantity === 0).length;

  const stockValue = products.reduce(
    (sum, product) => sum + Number(product.quantity) * Number(product.price),
    0
  );

  const showNotice = message => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  /* Search every important product field */
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = products.filter(product => {
    const searchableText = [
      product.name,
      product.sku,
      product.barcode,
      product.category,
      product.id,
      product.warehouse,
      product.supplier,
      product.status,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  const searchResults = normalizedQuery ? filtered.slice(0, 7) : [];

  /* Enter or clicking a result opens the Products page */
  const handleGlobalSearch = () => {
    if (!query.trim()) {
      setSearchOpen(false);
      return;
    }

    setActive("Products");
    setSearchOpen(false);
    setMobileOpen(false);
  };

  const openSearchResult = product => {
    setQuery(product.name);
    setActive("Products");
    setSearchOpen(false);
    setMobileOpen(false);
  };

  const addProduct = event => {
    event.preventDefault();

    const quantity = Number(newProduct.quantity);
    const minStock = Number(newProduct.minStock);
    const price = Number(newProduct.price);

    const product = {
      ...newProduct,
      id: editing?.id || `PRD-${Date.now().toString().slice(-6)}`,
      quantity,
      minStock,
      price,
      status:
        quantity === 0
          ? "Out of stock"
          : quantity <= minStock
          ? "Low stock"
          : "In stock",
    };

    setProducts(previous =>
      editing
        ? previous.map(item => item.id === editing.id ? product : item)
        : [product, ...previous]
    );

    setShowAdd(false);
    setEditing(null);
    setNewProduct(emptyProduct);

    showNotice(editing ? "Product updated successfully" : "New product added successfully");
  };

  const openEdit = product => {
    setEditing(product);
    setNewProduct({ ...product });
    setShowAdd(true);
  };

  const removeProduct = id => {
    if (window.confirm("Delete this product?")) {
      setProducts(previous => previous.filter(product => product.id !== id));
      showNotice("Product deleted");
    }
  };

  const nav = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Products", icon: Package },
    { label: "Inventory", icon: Boxes },
    { label: "Warehouses", icon: Warehouse },
    { label: "Suppliers", icon: Truck },
    { label: "Purchase Orders", icon: ShoppingCart },
    { label: "Barcode Scanner", icon: ScanBarcode },
    { label: "Reports", icon: BarChart3 },
    { label: "Stock Alerts", icon: Bell },
  ];

  const selectNav = name => {
    setActive(name);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const openProfile = () => selectNav("Settings");

  const startAddProduct = () => {
    setEditing(null);
    setNewProduct(emptyProduct);
    setShowAdd(true);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      onLogout();
    }
  };

  return (
    <div className="dashboard-shell">

      {/* SIDEBAR */}
      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        {/* Fixed brand */}
        <div className="sidebar-brand">
          <Link to="/" className="brand">
            <span className="brand-mark"><Boxes size={21} /></span>
            {!collapsed && (
              <span>stock<span className="brand-light">wise</span></span>
            )}
          </Link>

          <button
            type="button"
            className="icon-button sidebar-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X />
          </button>
        </div>

        {/* Workspace is fixed and NOT clickable */}
        <div className="workspace-switch">
          <div className="workspace-avatar">
            {workspaceName.slice(0, 1).toUpperCase()}
          </div>

          {!collapsed && (
            <div className="workspace-info">
              <strong>{workspaceName}</strong>
              <small>Business workspace</small>
            </div>
          )}
        </div>

        {/* Only this middle section scrolls */}
        <div className="sidebar-menu-scroll">
          {!collapsed && <div className="nav-caption">WORKSPACE</div>}

          <nav className="dash-nav">
            {nav.map(({ label, icon: Icon }) => (
              <button
                type="button"
                key={label}
                className={`nav-item ${active === label ? "active" : ""}`}
                onClick={() => selectNav(label)}
                title={collapsed ? label : ""}
              >
                <Icon size={18} />
                {!collapsed && <span>{label}</span>}

                {label === "Stock Alerts" && !collapsed && low + out > 0 && (
                  <b className="nav-count">{low + out}</b>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Fixed bottom controls */}
        <div className="sidebar-bottom">
  <button
    type="button"
    className={`nav-item ${active === "Settings" ? "active" : ""}`}
    onClick={() => selectNav("Settings")}
    title={collapsed ? "Settings" : ""}
  >
    <Settings size={18} />
    {!collapsed && <span>Settings</span>}
  </button>

  <button
    type="button"
    className="sidebar-profile"
    onClick={openProfile}
    title="Open administrator profile settings"
  >
    <div className="profile-avatar">
      {adminName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()}
    </div>

    {!collapsed && (
      <div className="profile-details">
        <strong>{adminName}</strong>
        <small>Administrator</small>
      </div>
    )}
  </button>

  <button
    type="button"
    className="nav-item logout-item"
    onClick={onLogout}
    title={collapsed ? "Sign Out" : ""}
  >
    <LogOut size={18} />
    {!collapsed && <span>Sign Out</span>}
  </button>
</div>
      </aside>

      {/* MAIN DASHBOARD */}
      <div className="dashboard-main">
       <header className={`dash-topbar ${mobileSearchOpen ? "search-expanded" : ""}`}>
          <button
            type="button"
            className="icon-button mobile-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>

          <button
            type="button"
            className="icon-button collapse-btn"
            onClick={() => setCollapsed(value => !value)}
            aria-label="Collapse sidebar"
          >
            <Menu />
          </button>

          <div className="breadcrumbs">
            <span>Workspace</span>
            <MoveRight size={14} />
            <strong>{active}</strong>
          </div>

          <div className="topbar-right">
            <AppearanceControls
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              rtl={rtl}
              setRtl={setRtl}
            />

            {/* WORKING GLOBAL SEARCH */}
            <div className="global-search-wrap">
              <form
                className="search-box top-search"
                onSubmit={event => {
                  event.preventDefault();
                  handleGlobalSearch();
                }}
              >
               <button
  type="button"
  className="icon-button mobile-search-toggle"
  onClick={() => {
    setMobileSearchOpen(value => !value);
    setSearchOpen(false);
  }}
  aria-label="Open product search"
  title="Search products"
>
  {mobileSearchOpen ? <X size={19} /> : <Search size={19} />}
</button>

                <input
                  type="search"
                  placeholder="Search products, SKU, barcode..."
                  value={query}
                  onFocus={() => setSearchOpen(true)}
                  onChange={event => {
                    setQuery(event.target.value);
                    setSearchOpen(true);
                  }}
                  onKeyDown={event => {
                    if (event.key === "Escape") {
                      setMobileSearchOpen(false);
                    }
                  }}
                />

                {query && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={() => {
                      setQuery("");
                      setSearchOpen(false);
                    }}
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}

                <kbd>Enter</kbd>
              </form>

              {searchOpen && normalizedQuery && (
                <div className="global-search-results">
                  <div className="search-results-heading">
                    <span>PRODUCT RESULTS</span>
                    <small>{filtered.length} found</small>
                  </div>

                  {searchResults.length > 0 ? (
                    searchResults.map(product => (
                      <button
                        type="button"
                        className="global-search-result"
                        key={product.id}
                        onClick={() => openSearchResult(product)}
                      >
                        <span className="search-result-icon">
                          <Package size={17} />
                        </span>

                        <span className="search-result-info">
                          <strong>{product.name}</strong>
                          <small>
                            {product.sku} · {product.category}
                          </small>
                        </span>

                        <span className="search-result-stock">
                          {product.quantity} units
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="global-search-empty">
                      <Search size={20} />
                      <strong>No products found</strong>
                      <span>Try a different name, SKU or barcode.</span>
                    </div>
                  )}

                  {filtered.length > 0 && (
                    <button
                      type="button"
                      className="search-view-all"
                      onClick={handleGlobalSearch}
                    >
                      View all {filtered.length} results
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              className="icon-button notification-button"
              onClick={() => selectNav("Stock Alerts")}
              title="Stock alerts"
            >
              <Bell size={18} />
              <i />
            </button>

            <button
              type="button"
              className="top-user"
              onClick={openProfile}
              title="Open administrator profile"
            >
              <div className="profile-avatar">
                {adminName
                  .split(" ")
                  .map(word => word[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <div>
                <strong>{adminName}</strong>
                <small>Admin</small>
              </div>

              <ChevronDown size={14} />
            </button>
          </div>
        </header>

        <div
          className="dash-content"
          onClick={() => {
            if (searchOpen) setSearchOpen(false);
          }}
        >
          {notice && (
            <div className="toast">
              <CheckCircle2 size={17} />
              {notice}
            </div>
          )}

          {active === "Overview" && (
            <Overview
              products={products}
              low={low}
              out={out}
              stockValue={stockValue}
              onNavigate={selectNav}
              onAddProduct={startAddProduct}
              adminName={adminName}
            />
          )}

          {active === "Products" && (
            <ProductsPage
              products={filtered}
              onAdd={startAddProduct}
              onEdit={openEdit}
              onDelete={removeProduct}
              query={query}
              setQuery={setQuery}
            />
          )}

          {active === "Inventory" && (
            <InventoryPage
              products={filtered}
              query={query}
              setQuery={setQuery}
            />
          )}

          {active === "Warehouses" && <WarehousesPage products={products} />}
          {active === "Suppliers" && <SuppliersPage />}
          {active === "Purchase Orders" && <PurchaseOrdersPage />}
          {active === "Barcode Scanner" && <ScannerPage products={products} />}

          {active === "Reports" && (
            <ReportsPage products={products} stockValue={stockValue} />
          )}

          {active === "Stock Alerts" && <AlertsPage products={products} />}

          {active === "Settings" && (
            <SettingsPage
              adminName={adminName}
              setAdminName={setAdminName}
              workspaceName={workspaceName}
              setWorkspaceName={setWorkspaceName}
            />
          )}
        </div>
      </div>

      {showAdd && (
        <ProductModal
          product={newProduct}
          setProduct={setNewProduct}
          onSubmit={addProduct}
          onClose={() => {
            setShowAdd(false);
            setEditing(null);
          }}
          editing={editing}
        />
      )}
    </div>
  );
}

/* =========================================================
   COMMON PAGE COMPONENTS
========================================================= */

function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="page-heading">
      <div>
        <div className="page-eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

function StatCard({ icon, label, value, change, color, alert }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-top">
        <span className="stat-icon">{icon}</span>
        {alert && <span className="stat-alert-dot" />}
      </div>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      <small>{change}</small>
    </div>
  );
}

function Status({ status }) {
  return (
    <span
      className={`status-pill ${
        status === "In stock"
          ? "status-green"
          : status === "Low stock"
          ? "status-yellow"
          : "status-red"
      }`}
    >
      <i />
      {status}
    </span>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function Overview({
  products,
  low,
  out,
  stockValue,
  onNavigate,
  onAddProduct,
  adminName,
}) {
  const totalUnits = products.reduce(
    (sum, product) => sum + Number(product.quantity),
    0
  );

  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date()).toUpperCase();

  return (
    <>
      <PageHeading
        eyebrow={todayLabel}
        title={`Good morning, ${adminName} `}
        description="Here’s what’s happening across your inventory today."
        action={
          <button className="button button-dark" onClick={onAddProduct}>
            <Plus size={16} /> Add product
          </button>
        }
      />

      <div className="overview-banner">
        <div>
          <span className="banner-tag">
            <Zap size={13} /> YOUR INVENTORY AT A GLANCE
          </span>
          <h2>Everything is in its place.</h2>
          <p>
            Stay on top of stock, orders, and warehouse activity from
            one workspace.
          </p>
        </div>

        <div className="banner-art">
          <Boxes size={100} />
          <div className="banner-orbit" />
        </div>
      </div>

      <div className="stats-grid">
        <StatCard icon={<Package />} label="Total products"
          value={products.length.toLocaleString()}
          change="Across your catalog" color="sage" />

        <StatCard icon={<Boxes />} label="Units in stock"
          value={totalUnits.toLocaleString()}
          change="Available inventory" color="blue" />

        <StatCard icon={<CircleDollarSign />} label="Inventory value"
          value={`$${stockValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
          change="Current stock valuation" color="gold" />

        <StatCard icon={<AlertTriangle />} label="Stock alerts"
          value={low + out}
          change={`${low} low stock · ${out} out of stock`}
          color="rose" alert={low + out > 0} />
      </div>

      <div className="dashboard-grid">
        <div className="panel sales-panel">
          <div className="panel-heading">
            <div>
              <h3>Sales overview</h3>
              <p>Track your weekly sales performance</p>
            </div>
            <select defaultValue="This week">
              <option>This week</option>
              <option>This month</option>
            </select>
          </div>

          <div className="chart-summary">
            <strong>$32,300</strong>
            <span className="trend"><TrendingUp size={14} /> 8.2%</span>
            <small>vs. previous week</small>
          </div>

          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7da58c" stopOpacity={0.24} />
                    <stop offset="100%" stopColor="#7da58c" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ede8" />
                <XAxis dataKey="day" axisLine={false} tickLine={false}
                  tick={{ fill: "#89938d", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false}
                  tick={{ fill: "#89938d", fontSize: 12 }}
                  tickFormatter={value => `$${value / 1000}k`} />
                <Tooltip />
                <Area type="monotone" dataKey="sales"
                  stroke="#3e765b" strokeWidth={2.5} fill="url(#salesFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel inventory-panel">
          <div className="panel-heading">
            <div>
              <h3>Inventory health</h3>
              <p>Stock status across products</p>
            </div>
            <button className="icon-button" onClick={() => onNavigate("Inventory")}>
              <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="inventory-total">
            <strong>{products.length}</strong>
            <span>total SKUs</span>
          </div>

          <div className="health-bar">
            <span
              style={{
                width: `${Math.max(5, (products.filter(p => p.quantity > p.minStock).length / Math.max(products.length, 1)) * 100)}%`,
              }}
            />
            <i style={{ width: `${(low / Math.max(products.length, 1)) * 100}%` }} />
          </div>

          <div className="health-legend">
            <div>
              <i className="dot-green" /> Healthy stock
              <span>{products.filter(p => p.quantity > p.minStock).length}</span>
            </div>
            <div><i className="dot-yellow" /> Low stock <span>{low}</span></div>
            <div><i className="dot-red" /> Out of stock <span>{out}</span></div>
          </div>

          <button className="panel-link" onClick={() => onNavigate("Stock Alerts")}>
            Review stock alerts <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <div className="panel recent-panel">
        <div className="panel-heading">
          <div>
            <h3>Recent stock movements</h3>
            <p>A live look at activity in your workspace</p>
          </div>
          <button className="text-link small-link" onClick={() => onNavigate("Inventory")}>
            View all <ArrowRight size={15} />
          </button>
        </div>

        <div className="movement-list">
          {movements.map((movement, index) => (
            <div className="movement-row" key={index}>
              <div className="movement-avatar">{movement.initials}</div>
              <div className="movement-info">
                <strong>{movement.title}</strong>
                <small>{movement.type} · {movement.date}</small>
              </div>
              <span className={`movement-qty ${movement.qty.startsWith("+") ? "qty-plus" : "qty-minus"}`}>
                {movement.qty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   PRODUCTS
========================================================= */

function ProductsPage({ products, onAdd, onEdit, onDelete, query, setQuery }) {
  return (
    <>
      <PageHeading
        eyebrow="CATALOG MANAGEMENT"
        title="Products"
        description="Manage your product catalog and keep every item organized."
        action={
          <button className="button button-dark" onClick={onAdd}>
            <Plus size={16} /> Add product
          </button>
        }
      />

      <div className="table-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search products, SKU, barcode, category..."
          />
          {query && (
            <button type="button" className="clear-search"
              onClick={() => setQuery("")} aria-label="Clear search">
              <X size={15} />
            </button>
          )}
        </div>

        <button className="button button-outline"
          onClick={() => alert("Showing all product categories.")}>
          <Filter size={15} /> Filters
        </button>

        <button className="button button-outline" onClick={() => downloadCSV(products)}>
          <Download size={15} /> Export
        </button>
      </div>

      <div className="panel table-panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" aria-label="Select all" /></th>
                <th>PRODUCT</th>
                <th>SKU / BARCODE</th>
                <th>WAREHOUSE</th>
                <th>QUANTITY</th>
                <th>UNIT PRICE</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td><input type="checkbox" aria-label={`Select ${product.name}`} /></td>

                  <td>
                    <div className="product-cell">
                      <div className="product-thumb"><Package size={18} /></div>
                      <div>
                        <strong>{product.name}</strong>
                        <small>{product.category} · {product.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <strong className="sku-text">{product.sku}</strong>
                    <small className="table-sub">{product.barcode}</small>
                  </td>

                  <td>{product.warehouse}</td>

                  <td>
                    <strong>{product.quantity}</strong>
                    <small className="table-sub">Min. {product.minStock} units</small>
                  </td>

                  <td>${Number(product.price).toFixed(2)}</td>
                  <td><Status status={product.status} /></td>

                  <td>
                    <div className="row-actions">
                      <button title="Edit product" onClick={() => onEdit(product)}>
                        <Pencil size={15} />
                      </button>
                      <button title="Delete product" onClick={() => onDelete(product.id)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="empty-state">
              <Package size={28} />
              <strong>No products found</strong>
              <span>Try another search or add a product.</span>
            </div>
          )}
        </div>

        <div className="table-footer">
          Showing <strong>{products.length}</strong> products
          <span>Demo inventory data</span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CSV EXPORT
========================================================= */

function downloadCSV(products) {
  const header = "ID,Name,SKU,Category,Warehouse,Quantity,Price,Status";

  const rows = products.map(product =>
    [
      product.id,
      product.name,
      product.sku,
      product.category,
      product.warehouse,
      product.quantity,
      product.price,
      product.status,
    ]
      .map(value => `"${String(value ?? "").replaceAll('"', '""')}"`)
      .join(",")
  );

  const blob = new Blob([[header, ...rows].join("\n")], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "stockwise-products.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

/* =========================================================
   INVENTORY
========================================================= */

function InventoryPage({ products, query, setQuery }) {
  return (
    <>
      <PageHeading
        eyebrow="STOCK CONTROL"
        title="Inventory"
        description="Monitor stock quantities and availability by location."
      />

      <div className="table-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search inventory..."
          />
          {query && (
            <button type="button" className="clear-search"
              onClick={() => setQuery("")} aria-label="Clear search">
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="stats-grid compact-stats">
        <StatCard icon={<Boxes />} label="Total units"
          value={products.reduce((sum, product) => sum + Number(product.quantity), 0)}
          change="Across matching products" color="sage" />

        <StatCard icon={<CheckCircle2 />} label="Healthy items"
          value={products.filter(p => p.quantity > p.minStock).length}
          change="Above minimum stock" color="blue" />

        <StatCard icon={<AlertTriangle />} label="Needs attention"
          value={products.filter(p => p.quantity <= p.minStock).length}
          change="At or below threshold" color="rose" />
      </div>

      <div className="panel table-panel">
        <div className="panel-heading">
          <div>
            <h3>Stock by product</h3>
            <p>Current stock and reorder thresholds</p>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>WAREHOUSE</th>
                <th>ON HAND</th>
                <th>MINIMUM</th>
                <th>STOCK LEVEL</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    <small className="table-sub">{product.sku}</small>
                  </td>
                  <td>{product.warehouse}</td>
                  <td><strong>{product.quantity}</strong> units</td>
                  <td>{product.minStock} units</td>
                  <td>
                    <div className="stock-progress">
                      <span style={{
                        width: `${Math.min(100, (product.quantity / Math.max(product.minStock, 1)) * 100)}%`,
                      }} />
                    </div>
                  </td>
                  <td><Status status={product.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="empty-state">
              <Package size={28} />
              <strong>No inventory found</strong>
              <span>Try another search.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   WAREHOUSES
========================================================= */

function WarehousesPage({ products }) {
  const names = ["Main Warehouse", "North Hub", "South Warehouse"];

  return (
    <>
      <PageHeading
        eyebrow="LOCATIONS"
        title="Warehouses"
        description="View stock distribution across your warehouse network."
        action={
          <button className="button button-dark"
            onClick={() => alert("Warehouse creation can be connected to a backend in the next phase.")}>
            <Plus size={16} /> Add warehouse
          </button>
        }
      />

      <div className="warehouse-grid">
        {names.map((name, index) => {
          const list = products.filter(product => product.warehouse === name);

          return (
            <div className="panel warehouse-card" key={name}>
              <div className="warehouse-illustration">
                <Warehouse size={34} />
                <span>0{index + 1}</span>
              </div>

              <h3>{name}</h3>
              <p>{[
                "Primary storage & fulfillment",
                "Regional distribution center",
                "Regional storage facility",
              ][index]}</p>

              <div className="warehouse-metrics">
                <div><strong>{list.length}</strong><small>Products</small></div>
                <div>
                  <strong>{list.reduce((sum, product) => sum + Number(product.quantity), 0)}</strong>
                  <small>Units in stock</small>
                </div>
              </div>

              <div className="warehouse-footer">
                <span className="status-pill status-green"><i />Operational</span>
                <button className="text-link"
                  onClick={() => alert(`${name}: ${list.length} product types`)}>
                  View details <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* =========================================================
   SUPPLIERS
========================================================= */

function SuppliersPage() {
  return (
    <>
      <PageHeading
        eyebrow="PARTNERS"
        title="Suppliers"
        description="Keep supplier information and purchasing relationships in one place."
        action={
          <button className="button button-dark"
            onClick={() => alert("Supplier creation is a demo placeholder.")}>
            <Plus size={16} /> Add supplier
          </button>
        }
      />

      <div className="panel table-panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>SUPPLIER</th>
                <th>CONTACT EMAIL</th>
                <th>PHONE</th>
                <th>PRODUCTS</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {suppliers.map(supplier => (
                <tr key={supplier.name}>
                  <td>
                    <div className="supplier-cell">
                      <span>{supplier.name.slice(0, 2).toUpperCase()}</span>
                      <strong>{supplier.name}</strong>
                    </div>
                  </td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.products} products</td>
                  <td><Status status="In stock" /></td>
                  <td>
                    <button className="icon-button"
                      onClick={() => alert(`${supplier.name}\n${supplier.email}\n${supplier.phone}`)}>
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   PURCHASE ORDERS
========================================================= */

function PurchaseOrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: "PO-2408",
      supplier: "ScanPro Systems",
      date: "Nov 08, 2026",
      items: 4,
      total: "$2,480.00",
      status: "Pending",
    },
    {
      id: "PO-2407",
      supplier: "PackWell Supplies",
      date: "Nov 07, 2026",
      items: 12,
      total: "$840.00",
      status: "Approved",
    },
    {
      id: "PO-2406",
      supplier: "StoreMax Ltd",
      date: "Nov 05, 2026",
      items: 3,
      total: "$1,920.00",
      status: "Received",
    },
  ]);

  return (
    <>
      <PageHeading
        eyebrow="PROCUREMENT"
        title="Purchase orders"
        description="Create and track purchase orders from your suppliers."
        action={
          <button
            className="button button-dark"
            onClick={() => setOrders(previous => [
              {
                id: `PO-${Date.now().toString().slice(-4)}`,
                supplier: "New supplier",
                date: new Date().toLocaleDateString("en-US", {
                  month: "short", day: "2-digit", year: "numeric",
                }),
                items: 1,
                total: "$0.00",
                status: "Pending",
              },
              ...previous,
            ])}
          >
            <Plus size={16} /> New purchase order
          </button>
        }
      />

      <div className="panel table-panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>ORDER</th><th>SUPPLIER</th><th>ORDER DATE</th>
                <th>ITEMS</th><th>TOTAL</th><th>STATUS</th><th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.supplier}</td>
                  <td>{order.date}</td>
                  <td>{order.items} items</td>
                  <td><strong>{order.total}</strong></td>
                  <td>
                    <span className={`status-pill ${
                      order.status === "Received"
                        ? "status-green"
                        : order.status === "Approved"
                        ? "status-blue"
                        : "status-yellow"
                    }`}>
                      <i />{order.status}
                    </span>
                  </td>
                  <td>
                    <button className="icon-button"
                      onClick={() => setOrders(previous => previous.map(item =>
                        item.id === order.id
                          ? { ...item, status: item.status === "Received" ? "Pending" : "Received" }
                          : item
                      ))}>
                      <Check size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   BARCODE SCANNER
========================================================= */

function ScannerPage({ products }) {
  const [barcode, setBarcode] = useState("");
  const [result, setResult] = useState(null);

  const scan = () => {
    const value = barcode.trim().toLowerCase();

    if (!value) {
      setResult(false);
      return;
    }

    const product = products.find(item =>
      String(item.barcode || "").toLowerCase() === value ||
      String(item.sku || "").toLowerCase() === value
    );

    setResult(product || false);
  };

  return (
    <>
      <PageHeading
        eyebrow="QUICK OPERATIONS"
        title="Barcode scanner"
        description="Look up products instantly using a barcode or SKU."
      />

      <div className="scanner-layout">
        <div className="panel scanner-panel">
          <div className="scanner-graphic">
            <ScanBarcode size={76} />
            <span className="scan-line" />
          </div>

          <h2>Scan or enter a barcode</h2>
          <p>Connect a barcode scanner or type a product barcode below.</p>

          <div className="scanner-input">
            <input
              value={barcode}
              onChange={event => {
                setBarcode(event.target.value);
                setResult(null);
              }}
              placeholder="Enter barcode or SKU"
              onKeyDown={event => event.key === "Enter" && scan()}
            />
            <button className="button button-dark" onClick={scan}>Find product</button>
          </div>

          <small className="scanner-hint">Try 8901001001 or WBS-204</small>
        </div>

        {result !== null && (
          <div className="panel scan-result">
            {result === false ? (
              <>
                <AlertTriangle size={24} />
                <h3>No product found</h3>
                <p>Check the barcode or SKU and try again.</p>
              </>
            ) : (
              <>
                <CheckCircle2 size={24} className="green-icon" />
                <h3>{result.name}</h3>
                <p>{result.sku} · {result.warehouse}</p>
                <strong>{result.quantity} units available</strong>
                <Status status={result.status} />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

/* =========================================================
   REPORTS
========================================================= */

function ReportsPage({ products, stockValue }) {
  return (
    <>
      <PageHeading
        eyebrow="BUSINESS INTELLIGENCE"
        title="Reports & analytics"
        description="Understand your inventory performance with clear insights."
        action={
          <button className="button button-outline" onClick={() => downloadCSV(products)}>
            <Download size={15} /> Export report
          </button>
        }
      />

      <div className="stats-grid">
        <StatCard icon={<CircleDollarSign />} label="Inventory value"
          value={`$${stockValue.toLocaleString()}`}
          change="Current valuation" color="sage" />
        <StatCard icon={<Package />} label="Product count"
          value={products.length} change="Active catalog" color="blue" />
        <StatCard icon={<AlertTriangle />} label="Items to reorder"
          value={products.filter(p => p.quantity <= p.minStock).length}
          change="Review replenishment" color="rose" />
      </div>

      <div className="panel sales-panel">
        <div className="panel-heading">
          <div>
            <h3>Weekly sales trend</h3>
            <p>Sample sales data for demonstration</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#5e8d70" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

/* =========================================================
   STOCK ALERTS
========================================================= */

function AlertsPage({ products }) {
  const alerts = products.filter(product => product.quantity <= product.minStock);

  return (
    <>
      <PageHeading
        eyebrow="ATTENTION REQUIRED"
        title="Stock alerts"
        description="Stay ahead of low inventory and avoid stockouts."
      />

      <div className="alert-summary">
        <AlertTriangle size={22} />
        <div>
          <strong>{alerts.length} items need attention</strong>
          <span>Review these products and replenish when needed.</span>
        </div>
      </div>

      <div className="panel table-panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>PRODUCT</th><th>WAREHOUSE</th><th>AVAILABLE</th>
                <th>REORDER LEVEL</th><th>RECOMMENDED ACTION</th>
              </tr>
            </thead>

            <tbody>
              {alerts.map(product => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    <small className="table-sub">{product.sku}</small>
                  </td>
                  <td>{product.warehouse}</td>
                  <td><strong className="danger-text">{product.quantity}</strong></td>
                  <td>{product.minStock}</td>
                  <td>
                    <span className="status-pill status-yellow">
                      <i />
                      Reorder {Math.max(product.minStock * 2 - product.quantity, product.minStock)} units
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {alerts.length === 0 && (
            <div className="empty-state">
              <CheckCircle2 />
              <strong>All products are healthy!</strong>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function SettingsPage({
  adminName,
  setAdminName,
  workspaceName,
  setWorkspaceName,
}) {
  const [name, setName] = useState(adminName || "Admin");
  const [workspace, setWorkspace] = useState(workspaceName || "Acme Industries");
  const [saved, setSaved] = useState(false);

  useEffect(() => setName(adminName || "Admin"), [adminName]);
  useEffect(() => setWorkspace(workspaceName || "Acme Industries"), [workspaceName]);

  const saveProfile = event => {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanWorkspace = workspace.trim();

    if (!cleanName || !cleanWorkspace) return;

    setAdminName(cleanName);
    setWorkspaceName(cleanWorkspace);

    localStorage.setItem("stockwise_admin_name", cleanName);
    localStorage.setItem("stockwise_workspace_name", cleanWorkspace);

    setSaved(true);
  };

  return (
    <>
      <PageHeading
        eyebrow="PREFERENCES"
        title="Settings"
        description="Manage your workspace preferences and profile."
      />

      <div className="panel settings-panel">
        <h3>Administrator profile</h3>
        <p>Change the name displayed in your StockWise dashboard.</p>

        <form onSubmit={saveProfile}>
          <label>
            Admin name
            <input
              value={name}
              onChange={event => {
                setName(event.target.value);
                setSaved(false);
              }}
              placeholder="Enter admin name"
              required
            />
          </label>

          <label>
            Email address
            <input value="admin@stockwise.com" readOnly />
          </label>

          <div className="settings-divider" />

          <h3>Business workspace</h3>
          <p>This name appears in the dashboard sidebar.</p>

          <label>
            Workspace name
            <input
              value={workspace}
              onChange={event => {
                setWorkspace(event.target.value);
                setSaved(false);
              }}
              placeholder="Enter workspace name"
              required
            />
          </label>

          <button type="submit" className="button button-dark">
            <Check size={16} /> Save changes
          </button>
        </form>

        {saved && (
          <span className="saved-message">
            Profile and workspace updated successfully.
          </span>
        )}
      </div>
    </>
  );
}

/* =========================================================
   ADD / EDIT PRODUCT MODAL
========================================================= */

function ProductModal({ product, setProduct, onSubmit, onClose, editing }) {
  const fields = [
    ["name", "Product name"],
    ["sku", "SKU"],
    ["barcode", "Barcode"],
    ["quantity", "Quantity"],
    ["minStock", "Minimum stock"],
    ["price", "Unit price ($)"],
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="product-modal" onClick={event => event.stopPropagation()}>
        <div className="modal-heading">
          <div>
            <span className="page-eyebrow">
              {editing ? "EDIT CATALOG ITEM" : "NEW CATALOG ITEM"}
            </span>
            <h2>{editing ? "Edit product" : "Add a product"}</h2>
            <p>Enter product details to keep your catalog up to date.</p>
          </div>

          <button type="button" className="icon-button" onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-grid">
            {fields.map(([key, label]) => (
              <label key={key}>
                {label}
                <input
                  type={["quantity", "minStock", "price"].includes(key) ? "number" : "text"}
                  min={["quantity", "minStock", "price"].includes(key) ? "0" : undefined}
                  step={key === "price" ? "0.01" : "1"}
                  required
                  value={product[key] ?? ""}
                  onChange={event => setProduct({
                    ...product,
                    [key]: event.target.value,
                  })}
                />
              </label>
            ))}

            <label>
              Category
              <select
                value={product.category}
                onChange={event => setProduct({ ...product, category: event.target.value })}
              >
                {["Electronics", "Packaging", "Warehouse", "Safety", "Other"].map(category => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>

            <label>
              Warehouse
              <select
                value={product.warehouse}
                onChange={event => setProduct({ ...product, warehouse: event.target.value })}
              >
                {["Main Warehouse", "North Hub", "South Warehouse"].map(warehouse => (
                  <option key={warehouse}>{warehouse}</option>
                ))}
              </select>
            </label>

            <label>
              Supplier
              <select
                value={product.supplier}
                onChange={event => setProduct({ ...product, supplier: event.target.value })}
              >
                {suppliers.map(supplier => (
                  <option key={supplier.name}>{supplier.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="button button-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button button-dark">
              <Check size={16} />
              {editing ? "Save changes" : "Add product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

/* =========================================================
   ADDITIONAL APPEARANCE STYLES
========================================================= */

const appearanceStyles = `
/* =====================================================
   SIDEBAR STRUCTURE
===================================================== */

.dashboard-shell {
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
}

.sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 0;
  overflow: hidden;
}

.sidebar-brand {
  flex-shrink: 0;
}

/* Workspace is a static label, not a button */
.workspace-switch {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  width: 100%;
  padding: 14px 16px;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: default;
}

.workspace-switch:hover {
  background: transparent;
  border-color: transparent;
}

.workspace-info {
  min-width: 0;
  overflow: hidden;
}

.workspace-info strong {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.workspace-info small {
  display: block;
}

/* Navigation alone scrolls */
.sidebar-menu-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 12px;
  scrollbar-width: thin;
  scrollbar-color: #c5d2c7 transparent;
}

.sidebar-menu-scroll::-webkit-scrollbar {
  width: 5px;
}

.sidebar-menu-scroll::-webkit-scrollbar-thumb {
  background: #c5d2c7;
  border-radius: 10px;
}

.dash-nav {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dash-nav .nav-item {
  width: 100%;
  flex-shrink: 0;
}

/* Settings and sign out stay at bottom */
.sidebar-bottom {
  flex-shrink: 0;
  margin-top: auto;
  padding: 12px;
  border-top: 1px solid #e8ede8;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: inherit;
}

.sidebar-bottom > .nav-item {
  width: 100%;
  flex-shrink: 0;
}

.sidebar-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 8px;
  padding: 12px 8px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.sidebar-profile:hover {
  background: #edf4ed;
}

.profile-details {
  min-width: 0;
  overflow: hidden;
}

.profile-details strong,
.profile-details small {
  display: block;
}

.profile-details strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.logout-item {
  margin-top: 2px;
}

.sidebar.collapsed .sidebar-profile {
  justify-content: center;
}

body.dark-mode .sidebar-bottom {
  border-color: #394b3e;
}

body.dark-mode .sidebar-profile:hover {
  background: #344d3a;
}

/* Main content scrolls independently */
.dashboard-main {
  height: 100vh;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

/* =====================================================
   GLOBAL SEARCH
===================================================== */

.global-search-wrap {
  position: relative;
  width: 290px;
  max-width: 32vw;
  z-index: 50;
}

.global-search-wrap .top-search {
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 0;
  background: transparent;
  color: #718078;
  padding: 3px;
  cursor: pointer;
}

.search-submit:hover {
  color: #3e765b;
}

.global-search-wrap .top-search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: none;
  box-shadow: none;
  background: transparent;
}

.global-search-wrap .top-search input:focus {
  outline: none;
  box-shadow: none;
}

.global-search-wrap .top-search kbd {
  flex-shrink: 0;
  font-size: 10px;
}

.clear-search {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 0;
  padding: 3px;
  background: transparent;
  color: #78877d;
  cursor: pointer;
}

.global-search-results {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  z-index: 200;
  overflow: hidden;
  background: #ffffff;
  color: #24362b;
  border: 1px solid #e3eae3;
  border-radius: 12px;
  box-shadow: 0 14px 40px rgba(20, 40, 25, 0.16);
}

.search-results-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid #edf0ed;
  color: #7b897f;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .7px;
}

.search-results-heading small {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0;
}

.global-search-result {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 13px;
  border: 0;
  border-bottom: 1px solid #f0f2f0;
  background: #ffffff;
  color: #26382c;
  text-align: left;
  cursor: pointer;
}

.global-search-result:hover {
  background: #f2f7f2;
}

.search-result-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 9px;
  background: #eaf2eb;
  color: #477353;
}

.search-result-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: 3px;
}

.search-result-info strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}

.search-result-info small {
  color: #829087;
  font-size: 10px;
}

.search-result-stock {
  flex-shrink: 0;
  color: #65816c;
  font-size: 10px;
  font-weight: 700;
}

.global-search-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  padding: 22px 12px;
  color: #87938a;
  text-align: center;
}

.global-search-empty strong {
  color: #45564a;
  font-size: 13px;
}

.global-search-empty span {
  font-size: 11px;
}

.search-view-all {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border: 0;
  background: #f5f8f5;
  color: #477353;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.search-view-all:hover {
  background: #eaf2eb;
}

/* =====================================================
   ADMIN PROFILE
===================================================== */

.top-user {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 0;
  background: transparent;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-align: left;
  padding: 6px 10px;
  border-radius: 10px;
}

.top-user:hover {
  background: #edf4ed;
}

.top-user strong,
.top-user small {
  display: block;
}

.top-user strong {
  font-size: 13px;
}

.top-user small {
  font-size: 11px;
  color: #829087;
}

/* =====================================================
   APPEARANCE CONTROLS
===================================================== */

.appearance-controls {
  display: flex;
  align-items: center;
  gap: 7px;
  position: relative;
  z-index: 8;
}

.appearance-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 34px;
  padding: 7px 9px;
  border: 1px solid #dfe7df;
  border-radius: 8px;
  background: #fff;
  color: #355441;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
}

.appearance-btn:hover {
  background: #edf4ed;
  border-color: #9bb5a0;
}

.rtl-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .3px;
}

/* =====================================================
   DARK MODE
===================================================== */

body.dark-mode {
  background: #111b15 !important;
  color: #e8efe9 !important;
}

body.dark-mode .site-header,
body.dark-mode .site-footer,
body.dark-mode .trust-strip {
  background: #1b2920 !important;
  border-color: #35483a !important;
  color: #e8efe9 !important;
}

body.dark-mode .site-header nav,
body.dark-mode .site-footer > div,
body.dark-mode .site-footer > span {
  color: #c0cec3 !important;
}

body.dark-mode .hero,
body.dark-mode .section,
body.dark-mode .login-page {
  background: #17231b !important;
  color: #e8efe9 !important;
}

body.dark-mode .hero h1,
body.dark-mode .section-heading h2,
body.dark-mode .workflow-copy h2,
body.dark-mode .feature-card h3,
body.dark-mode .login-form h2 {
  color: #e8efe9 !important;
}

body.dark-mode .hero-copy,
body.dark-mode .section-heading p,
body.dark-mode .workflow-copy > p,
body.dark-mode .feature-card p,
body.dark-mode .login-form > p {
  color: #b5c3b8 !important;
}

body.dark-mode .feature-card,
body.dark-mode .login-layout,
body.dark-mode .login-form-wrap,
body.dark-mode .panel,
body.dark-mode .stat-card,
body.dark-mode .sidebar,
body.dark-mode .dash-topbar,
body.dark-mode .product-modal {
  background: #202f25 !important;
  border-color: #3a4b3e !important;
  color: #e8efe9 !important;
}

body.dark-mode .workflow-section {
  background: #202f25 !important;
}

body.dark-mode .workflow-copy li,
body.dark-mode .breadcrumbs,
body.dark-mode td {
  color: #c2cec5 !important;
}

body.dark-mode .button-outline,
body.dark-mode .panel-link,
body.dark-mode .search-box,
body.dark-mode .workspace-switch,
body.dark-mode .input-icon {
  background: #293a2e !important;
  border-color: #435647 !important;
  color: #e8efe9 !important;
}

body.dark-mode input,
body.dark-mode select {
  background: #293a2e !important;
  color: #e8efe9 !important;
  border-color: #435647 !important;
}

body.dark-mode th {
  background: #293a2e !important;
  color: #c5d1c8 !important;
  border-color: #435647 !important;
}

body.dark-mode td,
body.dark-mode .movement-row {
  border-color: #394b3e !important;
}

body.dark-mode .nav-item {
  color: #bdcbbf !important;
}

body.dark-mode .nav-item.active {
  background: #344d3a !important;
  color: #e1eee3 !important;
}

body.dark-mode .sidebar-profile strong,
body.dark-mode .top-user strong,
body.dark-mode .panel h3,
body.dark-mode .stat-value,
body.dark-mode .page-heading h1 {
  color: #edf4ee !important;
}

body.dark-mode .appearance-btn {
  background: #26372b;
  color: #e7f0e8;
  border-color: #46594a;
}

body.dark-mode .login-form form label,
body.dark-mode .settings-panel label {
  color: #d8e4da;
}

body.dark-mode .login-form .input-icon input {
  background: transparent !important;
}

body.dark-mode .top-user:hover {
  background: #344d3a;
}

body.dark-mode .sidebar-bottom,
body.dark-mode .sidebar-profile {
  border-color: #394b3e;
}

body.dark-mode .sidebar-profile:hover {
  background: transparent;
}

body.dark-mode .sidebar-menu-scroll::-webkit-scrollbar-thumb {
  background: #526756;
}

body.dark-mode .global-search-results {
  background: #202f25;
  border-color: #405343;
  color: #e8efe9;
}

body.dark-mode .global-search-result {
  background: #202f25;
  border-color: #394b3e;
  color: #e8efe9;
}

body.dark-mode .global-search-result:hover {
  background: #2c4031;
}

body.dark-mode .search-result-icon {
  background: #344d3a;
  color: #cce0cf;
}

body.dark-mode .search-result-info small,
body.dark-mode .search-results-heading,
body.dark-mode .search-results-heading small {
  color: #aabaae;
}

body.dark-mode .global-search-empty strong {
  color: #e8efe9;
}

body.dark-mode .search-view-all {
  background: #293a2e;
  color: #cce0cf;
}

body.dark-mode .search-view-all:hover {
  background: #344d3a;
}

/* =====================================================
   RTL
===================================================== */

html[dir="rtl"] .site-header,
html[dir="rtl"] .header-actions,
html[dir="rtl"] .dash-topbar {
  direction: rtl;
}

html[dir="rtl"] .dashboard-shell {
  direction: rtl;
}

html[dir="rtl"] .sidebar {
  border-right: 0;
  border-left: 1px solid #e9ede8;
}

html[dir="rtl"] .topbar-right {
  margin-left: 0;
  margin-right: auto;
}

html[dir="rtl"] .nav-item {
  text-align: right;
}

html[dir="rtl"] .global-search-results {
  left: auto;
  right: 0;
}

html[dir="rtl"] .global-search-result {
  text-align: right;
}

html[dir="rtl"] .sidebar-profile {
  text-align: right;
}

/* =====================================================
   RESPONSIVE
===================================================== */


/* =====================================================
   RESPONSIVE - DESKTOP, TABLET AND MOBILE
===================================================== */

/* Tablet and smaller laptops */
@media (max-width: 1000px) {
  .global-search-wrap {
    width: 210px;
    max-width: 28vw;
  }

  .dashboard-main {
    min-width: 0;
  }

  .dash-content {
    min-width: 0;
  }

  .dashboard-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* Mobile and tablet */
@media (max-width: 800px) {
  html,
  body,
  #root {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    overflow-x: hidden;
  }

  .dashboard-shell {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }

  .dashboard-main {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: auto;
    min-height: 100vh;
    margin: 0;
    overflow-x: hidden;
    overflow-y: visible;
  }

  /* Mobile sidebar drawer */
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 260px;
    max-width: 85vw;
    height: 100dvh;
    transform: translateX(-100%);
    transition: transform .25s ease;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  html[dir="rtl"] .sidebar {
    left: auto;
    right: 0;
    transform: translateX(100%);
  }

  html[dir="rtl"] .sidebar.mobile-open {
    transform: translateX(0);
  }

  .mobile-menu {
    display: inline-flex;
    flex-shrink: 0;
  }

  .collapse-btn {
    display: none;
  }

  /* Header */
  .dash-topbar {
    position: relative;
    z-index: 30;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: 10px 14px;
    gap: 8px;
    flex-wrap: nowrap;
  }

  .breadcrumbs {
    min-width: 0;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
  }

  .topbar-right {
    display: flex;
    align-items: center;
    min-width: 0;
    flex-shrink: 0;
    gap: 6px;
  }

  .appearance-controls {
    gap: 4px;
  }

  .appearance-btn {
    min-height: 32px;
    padding: 6px 7px;
    font-size: 10px;
  }

  .appearance-btn span:not(.rtl-label) {
    display: none;
  }

  .global-search-wrap {
    width: 155px;
    max-width: 36vw;
    min-width: 0;
  }

  .global-search-wrap .top-search {
    width: 100%;
    min-width: 0;
  }

  .global-search-wrap .top-search input {
    min-width: 0;
    width: 100%;
    font-size: 11px;
  }

  .global-search-wrap .top-search kbd {
    display: none;
  }

  .global-search-results {
    left: auto;
    right: 0;
    width: min(320px, 85vw);
  }

  .top-user {
    flex-shrink: 0;
    padding: 4px;
  }

  .top-user > div:not(.profile-avatar) {
    display: none;
  }

  /* Main page content */
  .dash-content {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: 18px 16px 28px;
    overflow-x: hidden;
  }

  .page-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    gap: 12px;
  }

  .page-heading > div {
    min-width: 0;
    flex: 1 1 100%;
  }

  .page-heading h1 {
    overflow-wrap: anywhere;
  }

  /* Overview banner */
  .overview-banner {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    gap: 10px;
  }

  .banner-art {
    flex-shrink: 0;
  }

  /* Statistics */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    max-width: 100%;
    gap: 12px;
  }

  .stat-card {
    width: 100%;
    min-width: 0;
  }

  /* Charts and dashboard panels */
  .dashboard-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    width: 100%;
    max-width: 100%;
    gap: 14px;
  }

  .panel,
  .sales-panel,
  .inventory-panel,
  .recent-panel {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .chart-wrap {
    width: 100%;
    min-width: 0;
    overflow: hidden;
  }

  /* Warehouse cards */
  .warehouse-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    gap: 12px;
  }

  .warehouse-card {
    min-width: 0;
  }

  /* Toolbars */
  .table-toolbar {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 8px;
  }

  .table-toolbar .search-box {
    flex: 1 1 100%;
    width: 100%;
    min-width: 0;
  }

  /* Tables scroll inside their own container */
  .table-panel {
    width: 100%;
    min-width: 0;
    overflow: hidden;
  }

  .table-scroll {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .table-scroll table {
    min-width: 650px;
  }

  /* Scanner */
  .scanner-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    width: 100%;
    gap: 14px;
  }

  .scanner-input {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .scanner-input input {
    flex: 1 1 100%;
    width: 100%;
    min-width: 0;
  }

  /* Settings and modal */
  .settings-panel {
    width: 100%;
    min-width: 0;
  }

  .settings-panel form label {
    width: 100%;
  }

  .modal-backdrop {
    padding: 12px;
    overflow-y: auto;
  }

  .product-modal {
    width: 100%;
    max-width: 560px;
    max-height: calc(100dvh - 24px);
    overflow-y: auto;
  }

  .form-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* Small mobile phones */
@media (max-width: 600px) {
  .dash-topbar {
    padding: 9px 10px;
    gap: 6px;
  }

  .breadcrumbs span,
  .breadcrumbs svg {
    display: none;
  }

  .global-search-wrap {
    width: 125px;
    max-width: 34vw;
  }

  .dash-content {
    padding: 16px 12px 24px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  .stat-card {
    padding: 12px;
  }

  .stat-value {
    font-size: 19px;
    overflow-wrap: anywhere;
  }

  .overview-banner {
    padding: 18px;
  }

  .banner-art {
    display: none;
  }

  .panel-heading {
    flex-wrap: wrap;
    gap: 10px;
  }

  .warehouse-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .movement-row {
    gap: 8px;
  }

  .movement-info {
    min-width: 0;
  }

  .movement-info strong {
    overflow-wrap: anywhere;
  }

  .table-footer {
    flex-wrap: wrap;
    gap: 6px;
  }

  .modal-actions {
    flex-wrap: wrap;
  }

  .modal-actions button {
    flex: 1 1 120px;
  }
}

/* Extra-small phones */
@media (max-width: 380px) {
  .dash-topbar {
    padding: 8px;
    gap: 5px;
  }

  .global-search-wrap {
    width: 105px;
    max-width: 32vw;
  }

  .appearance-controls {
    gap: 3px;
  }

  .appearance-btn {
    padding: 5px;
  }

  .dash-content {
    padding-left: 10px;
    padding-right: 10px;
  }

  .stats-grid {
    gap: 8px;
  }

  .stat-card {
    padding: 10px;
  }

  .stat-label {
    font-size: 10px;
  }

  .stat-value {
    font-size: 17px;
  }

  .page-heading h1 {
    font-size: 24px;
  }
}




/* =========================================
   MOBILE SEARCH ICON AND EXPANDING SEARCH
========================================= */

/* Hidden on desktop */
.mobile-search-toggle {
  display: none;
}

@media (max-width: 800px) {
  /* Keep the page title and header controls on one row */
  .dash-topbar {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 8px;
    overflow: visible;
  }

  .dash-topbar .mobile-menu {
    display: inline-flex;
    flex: 0 0 36px;
    width: 36px;
    height: 36px;
  }

  .dash-topbar .breadcrumbs {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
  }

  .dash-topbar .breadcrumbs strong {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dash-topbar .topbar-right {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    min-width: 0;
    gap: 6px;
  }

  /* Show search icon instead of full search bar */
  .dash-topbar .mobile-search-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 36px;
    width: 36px;
    height: 36px;
    border: 1px solid #dfe7df;
    border-radius: 9px;
    background: #fff;
    color: #355441;
    cursor: pointer;
  }

  .dash-topbar .global-search-wrap {
    display: none;
  }

  /* Expand search below the header when icon is clicked */
  .dash-topbar.search-expanded .global-search-wrap {
    display: block;
    position: absolute;
    top: calc(100% + 6px);
    left: 12px;
    right: 12px;
    width: auto;
    max-width: none;
    z-index: 200;
    padding: 8px;
    border: 1px solid #e2e9e2;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 12px 30px rgba(20, 40, 25, 0.15);
  }

  .dash-topbar.search-expanded .top-search {
    display: flex;
    width: 100%;
    min-width: 0;
    height: 42px;
    padding: 0 10px;
  }

  .dash-topbar.search-expanded .top-search input {
    display: block;
    flex: 1;
    width: 100%;
    min-width: 0;
    font-size: 13px;
  }

  .dash-topbar.search-expanded .global-search-results {
    position: static;
    width: 100%;
    max-height: 280px;
    overflow-y: auto;
    margin-top: 8px;
    box-shadow: none;
  }

  /* Keep the other header buttons compact */
  .dash-topbar .appearance-controls {
    flex-shrink: 0;
  }

  .dash-topbar .appearance-btn {
    min-width: 32px;
    width: 32px;
    height: 34px;
    padding: 5px;
  }

  .dash-topbar .notification-button {
    flex-shrink: 0;
  }

  .dash-topbar .top-user {
    flex-shrink: 0;
  }
}

/* Extra-small phones */
@media (max-width: 380px) {
  .dash-topbar {
    gap: 5px;
    padding-left: 8px;
    padding-right: 8px;
  }

  .dash-topbar .topbar-right {
    gap: 4px;
  }

  .dash-topbar .breadcrumbs strong {
    font-size: 13px;
  }

  .dash-topbar .mobile-menu,
  .dash-topbar .mobile-search-toggle {
    flex-basis: 32px;
    width: 32px;
    height: 32px;
  }
}

/* Dark mode mobile search */
body.dark-mode .dash-topbar .mobile-search-toggle {
  background: #26372b;
  border-color: #46594a;
  color: #e7f0e8;
}

body.dark-mode .dash-topbar.search-expanded .global-search-wrap {
  background: #202f25;
  border-color: #405343;
}

body.dark-mode .dash-topbar.search-expanded .top-search {
  background: #293a2e;
  border-color: #435647;
}



`;