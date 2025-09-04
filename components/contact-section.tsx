"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function ContactSection() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: t.contact.info.email,
      value: "hola@capsulecodes.com",
      link: "mailto:hola@capsulecodes.com",
    },
    {
      icon: <Phone className="w-6 h-6 text-secondary" />,
      title: t.contact.info.phone,
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <MapPin className="w-6 h-6 text-accent" />,
      title: t.contact.info.location,
      value: "Ciudad del Futuro, Tech District",
      link: "#",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.contact.title.split(" ")[0]}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.contact.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{t.contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">{t.contact.form.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t.contact.form.name} *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t.contact.form.email} *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    {t.contact.form.company}
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t.contact.form.message} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.form.messagePlaceholder}
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {t.contact.form.send}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">{t.contact.info.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">{t.contact.info.description}</p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-muted rounded-lg">{info.icon}</div>
                      <div>
                        <h4 className="font-semibold text-foreground">{info.title}</h4>
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dragon Ball inspired power level */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🐉</div>
                <h4 className="font-bold text-lg mb-2">{t.contact.dragon.title}</h4>
                <p className="text-sm text-muted-foreground">{t.contact.dragon.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
