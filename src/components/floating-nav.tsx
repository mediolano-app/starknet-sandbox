"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Home,
  Layers,
  Users,
  Menu,
  X,
  Sparkles,
  BookOpen,
  BarChart,
  Plus,
  Compass,
  ChevronDown,
  HelpCircle,
  Moon,
  Sun,
  DollarSign,
  Info,
  ImageIcon,
  Music,
  Video,
  FileText,
  Code,
  Globe,
  Tag,
  Brush,
  Star,
  TrendingUp,
  Activity,
  Zap,
  Award,
  Wallet,
  Settings,
  ShoppingBag,
  Lightbulb,
  Heart,
  Clock,
  Filter,
  PieChart,
  Shield,
  MessageSquare,
  Newspaper,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/src/components/ui/dropdown-menu"
import { Input } from "@/src/components/ui/input"
import { useMobile } from "@/src/hooks/use-mobile"
import { cn } from "@/src/lib/utils"
import NotificationsMenu from "@/src/components/notifications-menu"
import UserAccountPanel from "@/src/components/user-account-panel"
import { useToast } from "@/src/components/ui/use-toast"

const FloatingNav = () => {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { toast } = useToast()
  const [theme, setTheme] = useState("dark")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // Apply theme to document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    toast({
      title: `${newTheme === "light" ? "Light" : "Dark"} mode activated`,
      description: `You've switched to ${newTheme} mode.`,
      duration: 2000,
    })
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isSearchOpen) setIsSearchOpen(false)
  }

  const closeAll = () => {
    setIsMobileMenuOpen(false)
    setIsSearchOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const navigateTo = (path) => {
    router.push(path)
    closeAll()
  }

  // Navigation structure
  const navigationItems = [
    {
      icon: <Home className="w-4 h-4 mr-2" />,
      label: "Home",
      isActive: pathname === "/",
      items: [
        { icon: <Sparkles className="w-4 h-4 mr-2" />, label: "Featured", href: "/" },
        { icon: <TrendingUp className="w-4 h-4 mr-2" />, label: "Trending", href: "/?view=trending" },
        { icon: <Star className="w-4 h-4 mr-2" />, label: "New Releases", href: "/?view=new" },
        { icon: <Award className="w-4 h-4 mr-2" />, label: "Top Creators", href: "/?view=creators" },
        { icon: <Heart className="w-4 h-4 mr-2" />, label: "Popular Collections", href: "/?view=collections" },
      ],
    },
    {
      icon: <Compass className="w-4 h-4 mr-2" />,
      label: "Explore",
      isActive:
        pathname.startsWith("/explore") || pathname.startsWith("/assets") || pathname.startsWith("/collections"),
      items: [
        {
          icon: <ImageIcon className="w-4 h-4 mr-2" />,
          label: "By Category",
          submenu: [
            {
              icon: <Brush className="w-4 h-4 mr-2" />,
              label: "Digital Art",
              href: "/explore?category=art",
            },
            { icon: <Music className="w-4 h-4 mr-2" />, label: "Music", href: "/explore?category=music" },
            { icon: <Video className="w-4 h-4 mr-2" />, label: "Video", href: "/explore?category=film" },
            {
              icon: <FileText className="w-4 h-4 mr-2" />,
              label: "Written Works",
              href: "/explore?category=literature",
            },
            { icon: <Code className="w-4 h-4 mr-2" />, label: "Code & AI", href: "/explore?category=code" },
            { icon: <Globe className="w-4 h-4 mr-2" />, label: "3D & AR/VR", href: "/explore?category=3d" },
          ],
        },
        { icon: <Filter className="w-4 h-4 mr-2" />, label: "Advanced Search", href: "/explore/search" },
        { icon: <Tag className="w-4 h-4 mr-2" />, label: "All Assets", href: "/assets" },
        { icon: <Layers className="w-4 h-4 mr-2" />, label: "Collections", href: "/collections" },
        { icon: <Users className="w-4 h-4 mr-2" />, label: "Creators", href: "/users" },
        { icon: <Activity className="w-4 h-4 mr-2" />, label: "Activity", href: "/activity" },
        { icon: <Clock className="w-4 h-4 mr-2" />, label: "Recent", href: "/explore?sort=recent" },
      ],
    },
    {
      icon: <ShoppingBag className="w-4 h-4 mr-2" />,
      label: "Marketplace",
      isActive: pathname.startsWith("/marketplace") || pathname.startsWith("/licensing"),
      items: [
        { icon: <Tag className="w-4 h-4 mr-2" />, label: "Buy Assets", href: "/marketplace?type=buy" },
        { icon: <DollarSign className="w-4 h-4 mr-2" />, label: "Sell Assets", href: "/marketplace?type=sell" },
        { icon: <Clock className="w-4 h-4 mr-2" />, label: "Live Auctions", href: "/marketplace?type=auctions" },
        { icon: <Zap className="w-4 h-4 mr-2" />, label: "Make Offer", href: "/marketplace?type=offers" },
        { icon: <Shield className="w-4 h-4 mr-2" />, label: "Licensing", href: "/licensing" },
        { icon: <TrendingUp className="w-4 h-4 mr-2" />, label: "Market Stats", href: "/marketplace/stats" },
      ],
    },
    {
      icon: <Plus className="w-4 h-4 mr-2" />,
      label: "Create",
      isActive: pathname.startsWith("/create"),
      items: [
        { icon: <Plus className="w-4 h-4 mr-2" />, label: "New Asset", href: "/create" },
        { icon: <Layers className="w-4 h-4 mr-2" />, label: "New Collection", href: "/create/collection" },
        { icon: <Users className="w-4 h-4 mr-2" />, label: "Batch Upload", href: "/create?type=batch" },
        { icon: <Code className="w-4 h-4 mr-2" />, label: "Programmable Rules", href: "/create/rules" },
        { icon: <Lightbulb className="w-4 h-4 mr-2" />, label: "Templates", href: "/create?view=templates" },
      ],
    },
    {
      icon: <BookOpen className="w-4 h-4 mr-2" />,
      label: "Learn",
      isActive: pathname.startsWith("/learn") || pathname.startsWith("/docs"),
      items: [
        { icon: <Info className="w-4 h-4 mr-2" />, label: "Guides & Tutorials", href: "/learn" },
        { icon: <HelpCircle className="w-4 h-4 mr-2" />, label: "FAQ", href: "/learn/faq" },
        { icon: <DollarSign className="w-4 h-4 mr-2" />, label: "Monetization", href: "/learn/monetization" },
        { icon: <Shield className="w-4 h-4 mr-2" />, label: "IP Protection", href: "/learn/ip-protection" },
        { icon: <Code className="w-4 h-4 mr-2" />, label: "Developer Docs", href: "/docs/api" },
        { icon: <Newspaper className="w-4 h-4 mr-2" />, label: "Blog", href: "/blog" },
      ],
    },
    {
      icon: <BarChart className="w-4 h-4 mr-2" />,
      label: "Dashboard",
      isActive: pathname.startsWith("/portfolio"),
      items: [
        { icon: <Layers className="w-4 h-4 mr-2" />, label: "My Assets", href: "/portfolio" },
        { icon: <Wallet className="w-4 h-4 mr-2" />, label: "My Collections", href: "/portfolio?tab=collections" },
        { icon: <DollarSign className="w-4 h-4 mr-2" />, label: "Revenue", href: "/portfolio/revenue" },
        { icon: <Shield className="w-4 h-4 mr-2" />, label: "Licensing", href: "/portfolio/licensings" },
        { icon: <PieChart className="w-4 h-4 mr-2" />, label: "Analytics", href: "/portfolio/analytics" },
        { icon: <MessageSquare className="w-4 h-4 mr-2" />, label: "Messages", href: "/portfolio/messages" },
        { icon: <Settings className="w-4 h-4 mr-2" />, label: "Settings", href: "/settings" },
      ],
    },
  ]

  // Mobile navigation items (simplified)
  const mobileNavItems = [
    {
      icon: <Home className="w-4 h-4 mr-2" />,
      label: "Home",
      isActive: pathname === "/",
      href: "/",
    },
    {
      icon: <Compass className="w-4 h-4 mr-2" />,
      label: "Explore",
      isActive: pathname.startsWith("/explore"),
      href: "/explore",
    },
    {
      icon: <ShoppingBag className="w-4 h-4 mr-2" />,
      label: "Marketplace",
      isActive: pathname.startsWith("/marketplace"),
      href: "/marketplace",
    },
    {
      icon: <Plus className="w-4 h-4 mr-2" />,
      label: "Create",
      isActive: pathname.startsWith("/create"),
      href: "/create",
    },
    {
      icon: <BookOpen className="w-4 h-4 mr-2" />,
      label: "Learn",
      isActive: pathname.startsWith("/learn"),
      href: "/learn",
    },
    {
      icon: <BarChart className="w-4 h-4 mr-2" />,
      label: "Dashboard",
      isActive: pathname.startsWith("/portfolio"),
      href: "/portfolio",
    },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-2" : "py-4",
          isMobile ? "px-4" : "px-6",
        )}
      >
        <div
          className={cn(
            "w-full mx-auto rounded-full glass-effect border border-white/10 transition-all duration-300",
            scrolled ? "shadow-lg bg-black/70" : "bg-black/40",
          )}
        >
          <div className="relative flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo("/")}>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-primary"></div>
                {!isMobile && <span className="font-bold text-lg">MediaLane</span>}
              </div>
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden md:flex px-4 space-x-1">
                {navigationItems.map((item, index) => (
                  <NavDropdown
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    isActive={item.isActive}
                    items={item.items}
                    onNavigate={navigateTo}
                  />
                ))}
              </nav>
            )}

            {/* Right section - Desktop */}
            {!isMobile && (
              <div className="flex items-center pr-4 space-x-3">
                <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleSearch}>
                  <Search className="w-5 h-5" />
                </Button>

                <NotificationsMenu />

                <UserAccountPanel />
              </div>
            )}

            {/* Mobile Navigation */}
            {isMobile && (
              <div className="flex items-center space-x-2 pr-4">
                <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleSearch}>
                  <Search className="w-5 h-5" />
                </Button>

                <NotificationsMenu />

                <UserAccountPanel />

                <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleMobileMenu}>
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Expanded Menu */}
          <AnimatePresence>
            {isMobile && isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-white/10"
              >
                <div className="px-4 py-3 space-y-1">
                  {mobileNavItems.map((item, index) => (
                    <NavItem
                      key={index}
                      icon={item.icon}
                      label={item.label}
                      isActive={item.isActive}
                      onClick={() => navigateTo(item.href)}
                    />
                  ))}

                  <div className="pt-2 space-y-2">
                    <div className="border-t border-white/10 my-2"></div>
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={toggleTheme}>
                      {theme === "dark" ? (
                        <>
                          <Sun className="w-4 h-4 mr-2" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="w-4 h-4 mr-2" />
                          Dark Mode
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-white/10"
              >
                <div className="px-4 py-3">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search assets, creators, or collections..."
                      className="pl-10 bg-black/40 border-white/10"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={toggleSearch}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40 glass-effect border-t border-white/10 bg-black/80 backdrop-blur-lg">
          <div className="flex items-center justify-between px-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "py-3 flex-1 rounded-none flex flex-col items-center",
                pathname === "/" ? "text-primary" : "text-zinc-400",
              )}
              onClick={() => navigateTo("/")}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "py-3 flex-1 rounded-none flex flex-col items-center",
                pathname.startsWith("/explore") ? "text-primary" : "text-zinc-400",
              )}
              onClick={() => navigateTo("/explore")}
            >
              <Compass className="h-5 w-5" />
              <span className="text-xs mt-1">Explore</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="py-3 rounded-none flex-1 flex flex-col items-center text-primary relative"
              onClick={() => navigateTo("/create")}
            >
              <div className="absolute -top-5 rounded-full bg-primary p-3 shadow-lg">
                <Plus className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs mt-6">Create</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "py-3 flex-1 rounded-none flex flex-col items-center",
                pathname.startsWith("/marketplace") ? "text-primary" : "text-zinc-400",
              )}
              onClick={() => navigateTo("/marketplace")}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-xs mt-1">Market</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "py-3 flex-1 rounded-none flex flex-col items-center",
                pathname.startsWith("/portfolio") ? "text-primary" : "text-zinc-400",
              )}
              onClick={() => navigateTo("/portfolio")}
            >
              <Wallet className="h-5 w-5" />
              <span className="text-xs mt-1">My IP</span>
            </Button>
          </div>
        </div>
      )}

      {/* Background overlay */}
      <AnimatePresence>
        {(isMobileMenuOpen || isSearchOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
            onClick={closeAll}
          />
        )}
      </AnimatePresence>

      {/* Navigation Items Component */}
      <style jsx global>{`
        .glass-effect {
          backdrop-filter: blur(12px);
          background-color: rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </>
  )
}

const NavItem = ({ icon, label, isActive = false, onClick = () => {} }) => (
  <Button
    variant={isActive ? "secondary" : "ghost"}
    className={cn("w-full justify-start rounded-lg", isActive ? "bg-primary/20" : "")}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Button>
)

const NavDropdown = ({ icon, label, isActive = false, items = [], onNavigate }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn("rounded-lg", isActive ? "bg-primary/20" : "")}
        >
          {icon}
          <span>{label}</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-56 bg-black/90 backdrop-blur-md border border-white/20 text-white z-50"
      >
        <DropdownMenuGroup>
          {items.map((item, index) =>
            item.submenu ? (
              <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger className="flex items-center">
                  {item.icon}
                  <span>{item.label}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-black/90 backdrop-blur-md border border-white/20 text-white z-50">
                    {item.submenu.map((subItem, subIndex) => (
                      <DropdownMenuItem
                        key={subIndex}
                        className="flex items-center hover:bg-white/10 focus:bg-white/10"
                        onClick={() => onNavigate(subItem.href)}
                      >
                        {subItem.icon}
                        <span>{subItem.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem
                key={index}
                className="flex items-center hover:bg-white/10 focus:bg-white/10"
                onClick={() => onNavigate(item.href)}
              >
                {item.icon}
                <span>{item.label}</span>
              </DropdownMenuItem>
            ),
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FloatingNav
