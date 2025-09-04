"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  category: "web" | "mobile" | "fullstack"
}

export interface Technology {
  id: string
  name: string
  category: "frontend" | "backend" | "mobile" | "database" | "deployment"
  icon: string
  description: string
}

interface DataContextType {
  projects: Project[]
  technologies: Technology[]
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void
  addTechnology: (technology: Omit<Technology, "id">) => void
  updateTechnology: (id: string, technology: Partial<Technology>) => void
  deleteTechnology: (id: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

// Initial mock data
const initialProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and MongoDB",
    image: "/modern-ecommerce-platform.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    category: "fullstack",
  },
  {
    id: "2",
    title: "Mobile Fitness App",
    description: "React Native fitness tracking app with real-time analytics",
    image: "/fitness-mobile-app-interface.png",
    technologies: ["React Native", "Expo", "Firebase"],
    liveUrl: "https://apps.apple.com/example",
    category: "mobile",
  },
  {
    id: "3",
    title: "Corporate Website",
    description: "Modern corporate website built with Next.js and Tailwind CSS",
    image: "/corporate-website.png",
    technologies: ["Next.js", "Tailwind CSS", "Supabase"],
    liveUrl: "https://example.com",
    category: "web",
  },
]

const initialTechnologies: Technology[] = [
  // Frontend
  { id: "1", name: "React.js", category: "frontend", icon: "⚛️", description: "Modern UI library" },
  { id: "2", name: "Next.js", category: "frontend", icon: "▲", description: "Full-stack React framework" },
  { id: "3", name: "Astro", category: "frontend", icon: "🚀", description: "Static site generator" },
  { id: "4", name: "Tailwind CSS", category: "frontend", icon: "🎨", description: "Utility-first CSS framework" },

  // Backend
  { id: "5", name: "Node.js", category: "backend", icon: "🟢", description: "JavaScript runtime" },
  { id: "6", name: "Express.js", category: "backend", icon: "🚂", description: "Web framework for Node.js" },

  // Mobile
  { id: "7", name: "React Native", category: "mobile", icon: "📱", description: "Cross-platform mobile development" },
  { id: "8", name: "Expo", category: "mobile", icon: "⚡", description: "React Native development platform" },
  { id: "9", name: "TypeScript", category: "mobile", icon: "🔷", description: "Typed JavaScript" },

  // Database
  { id: "10", name: "MongoDB", category: "database", icon: "🍃", description: "NoSQL database" },
  { id: "11", name: "Supabase", category: "database", icon: "⚡", description: "Open source Firebase alternative" },
  { id: "12", name: "Firebase", category: "database", icon: "🔥", description: "Google cloud platform" },

  // Deployment
  { id: "13", name: "Vercel", category: "deployment", icon: "▲", description: "Frontend deployment platform" },
  { id: "14", name: "App Store", category: "deployment", icon: "🍎", description: "iOS app distribution" },
  { id: "15", name: "Play Store", category: "deployment", icon: "🤖", description: "Android app distribution" },
]

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [technologies, setTechnologies] = useState<Technology[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("capsule-projects")
    const savedTechnologies = localStorage.getItem("capsule-technologies")

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      setProjects(initialProjects)
    }

    if (savedTechnologies) {
      setTechnologies(JSON.parse(savedTechnologies))
    } else {
      setTechnologies(initialTechnologies)
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("capsule-projects", JSON.stringify(projects))
    }
  }, [projects])

  useEffect(() => {
    if (technologies.length > 0) {
      localStorage.setItem("capsule-technologies", JSON.stringify(technologies))
    }
  }, [technologies])

  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: Date.now().toString() }
    setProjects((prev) => [...prev, newProject])
  }

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedProject } : p)))
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const addTechnology = (technology: Omit<Technology, "id">) => {
    const newTechnology = { ...technology, id: Date.now().toString() }
    setTechnologies((prev) => [...prev, newTechnology])
  }

  const updateTechnology = (id: string, updatedTechnology: Partial<Technology>) => {
    setTechnologies((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedTechnology } : t)))
  }

  const deleteTechnology = (id: string) => {
    setTechnologies((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <DataContext.Provider
      value={{
        projects,
        technologies,
        addProject,
        updateProject,
        deleteProject,
        addTechnology,
        updateTechnology,
        deleteTechnology,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
