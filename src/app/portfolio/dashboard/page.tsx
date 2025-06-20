"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, DollarSign, Users, BarChart3, TrendingUp, Calendar, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { useMockData } from "@/src/lib/hooks/use-mock-data"
import PageTransition from "@/src/components/page-transition"

export default function CreatorDashboardPage() {
  const { assets, collections } = useMockData()
  const [period, setPeriod] = useState("month")

  // Mock statistics
  const stats = {
    revenue: {
      day: "0.8 STRK",
      week: "5.2 STRK",
      month: "18.7 STRK",
      year: "124.5 STRK",
    },
    sales: {
      day: 2,
      week: 8,
      month: 24,
      year: 156,
    },
    views: {
      day: 45,
      week: 320,
      month: 1250,
      year: 15400,
    },
    followers: {
      day: 3,
      week: 12,
      month: 48,
      year: 580,
    },
  }

  // Mock recent activities
  const recentActivities = [
    {
      id: "1",
      type: "sale",
      description: "Digital Masterpiece #1 was sold for 2.5 STRK",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "license",
      description: "Music Rights Token was licensed for 12 months",
      time: "5 hours ago",
    },
    {
      id: "3",
      type: "follow",
      description: "CryptoArtist started following you",
      time: "1 day ago",
    },
    {
      id: "4",
      type: "view",
      description: "Your Patent #45892 received 24 new views",
      time: "2 days ago",
    },
  ]

  // Mock upcoming events
  const upcomingEvents = [
    {
      id: "1",
      title: "IP Creator Roundtable",
      description: "Join other creators to discuss IP trends",
      date: "Tomorrow, 3 PM UTC",
    },
    {
      id: "2",
      title: "Your Collection Launch",
      description: "Digital Art Masters collection goes live",
      date: "May 15, 12 PM UTC",
    },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-32 px-4 md:px-8">
        <motion.div
          className="flex flex-col items-center text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <LayoutDashboard className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Creator Analytics</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 gradient-text">Creator Dashboard</h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
            Track your performance, manage your assets, and grow your IP portfolio
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Time period selector */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="month" value={period} onValueChange={setPeriod} className="w-full justify-end">
              <div className="flex justify-end mb-4">
                <TabsList className="glass-effect">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </motion.div>

          {/* Stats cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-effect border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="rounded-full bg-green-500/20 p-2 mr-3">
                    <DollarSign className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.revenue[period]}</div>
                    <p className="text-xs text-zinc-400">+12% from previous {period}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-500/20 p-2 mr-3">
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.sales[period]}</div>
                    <p className="text-xs text-zinc-400">+8% from previous {period}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="rounded-full bg-purple-500/20 p-2 mr-3">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.views[period]}</div>
                    <p className="text-xs text-zinc-400">+15% from previous {period}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Followers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="rounded-full bg-pink-500/20 p-2 mr-3">
                    <Users className="h-4 w-4 text-pink-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.followers[period]}</div>
                    <p className="text-xs text-zinc-400">+5% from previous {period}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent activity and upcoming events */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="glass-effect border-white/10 h-full">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest interactions and transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start border-b border-white/10 pb-3 last:border-0">
                        <div className="flex-1">
                          <p className="text-sm">{activity.description}</p>
                          <p className="text-xs text-zinc-400">{activity.time}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-2">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="glass-effect border-white/10 h-full">
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events and deadlines to remember</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border-b border-white/10 pb-3 last:border-0">
                        <div className="flex items-center mb-1">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          <p className="text-xs text-zinc-400">{event.date}</p>
                        </div>
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <p className="text-xs text-zinc-400">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
