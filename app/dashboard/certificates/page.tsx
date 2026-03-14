"use client";

import { motion } from "motion/react";
import {
  Award,
  Download,
  Mail,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import * as Tabs from "@radix-ui/react-tabs";

const fontOptions = [
  { label: "Serif", value: "font-serif" },
  { label: "Sans Serif", value: "font-sans" },
  { label: "Monospace", value: "font-mono" },
];

const backgroundOptions = [
  {
    label: "White",
    preview: "bg-white",
    cert: "bg-white",
  },
  {
    label: "Blue",
    preview: "bg-gradient-to-br from-blue-50 to-blue-100",
    cert: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    label: "Green",
    preview: "bg-gradient-to-br from-green-50 to-green-100",
    cert: "bg-gradient-to-br from-green-50 to-green-100",
  },
];

export default function CertificatesPage() {
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [autoEmail, setAutoEmail] = useState(true);
  const [verificationId, setVerificationId] = useState("");
  const [selectedFont, setSelectedFont] = useState(fontOptions[0].value);
  const [selectedBg, setSelectedBg] = useState(0);
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    name?: string;
    event?: string;
  } | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = verificationId.length > 5;
    setVerificationResult({
      valid: isValid,
      name: isValid ? "John Doe" : undefined,
      event: isValid ? "Cloud Study Jam 2026" : undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Certificate Automation
        </h1>
        <p className="text-gray-600 mt-1">
          Design, generate, and verify certificates
        </p>
      </div>

      <Tabs.Root defaultValue="designer" className="space-y-6">
        <Tabs.List className="flex space-x-2 bg-white rounded-lg p-1 border border-gray-200 w-fit">
          <Tabs.Trigger
            value="designer"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-[#4285F4] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
          >
            Designer
          </Tabs.Trigger>
          <Tabs.Trigger
            value="automation"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-[#4285F4] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
          >
            Automation
          </Tabs.Trigger>
          <Tabs.Trigger
            value="verification"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-[#4285F4] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
          >
            Verification
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="designer">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Certificate Preview
              </h3>

              <div
                className={`${backgroundOptions[selectedBg].cert} ${selectedFont} border-4 border-[#4285F4] rounded-xl p-12 aspect-[1.4/1] relative`}
              >
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Certificate of Completion
                  </h2>
                  <div className="text-sm text-gray-600">
                    This is to certify that
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-[#4285F4] mb-2 border-b-2 border-[#4285F4] inline-block px-8 pb-2">
                    [Participant Name]
                  </div>
                </div>

                <div className="text-center mb-8">
                  <p className="text-gray-700 mb-2">
                    has successfully completed the
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    [Event Name]
                  </p>
                  <p className="text-gray-600 mt-2">[Date]</p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="text-sm text-gray-600">
                    Certificate ID: [ID]
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-gray-300 pt-2 px-8">
                      <div className="font-semibold text-gray-900">
                        Organizer
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 w-16 h-16 bg-white border border-gray-300 rounded flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-200" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Customize
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Style
                    </label>
                    <select
                      value={selectedFont}
                      onChange={(e) => setSelectedFont(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                    >
                      {fontOptions.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {backgroundOptions.map((bg, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedBg(index)}
                          className={`aspect-square ${bg.preview} rounded-lg cursor-pointer hover:opacity-80 transition-all ${
                            selectedBg === index
                              ? "ring-2 ring-[#4285F4] ring-offset-2"
                              : "border border-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-2 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity">
                    Save Template
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="automation">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Automation Rules
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900">
                      Auto-generate after attendance
                    </div>
                    <div className="text-sm text-gray-600">
                      Generate certificates automatically when users check in
                    </div>
                  </div>
                  <Switch.Root
                    checked={autoGenerate}
                    onCheckedChange={setAutoGenerate}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoGenerate ? "bg-[#4285F4]" : "bg-gray-300"
                    }`}
                  >
                    <Switch.Thumb
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        autoGenerate ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900">
                      Auto-email delivery
                    </div>
                    <div className="text-sm text-gray-600">
                      Send certificates via email automatically
                    </div>
                  </div>
                  <Switch.Root
                    checked={autoEmail}
                    onCheckedChange={setAutoEmail}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoEmail ? "bg-[#4285F4]" : "bg-gray-300"
                    }`}
                  >
                    <Switch.Thumb
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        autoEmail ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </Switch.Root>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Email Preview
              </h3>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-200">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div className="text-sm font-medium text-gray-900">
                    Your Certificate is Ready!
                  </div>
                </div>

                <div className="text-sm text-gray-700 space-y-3">
                  <p>Hi [Name],</p>
                  <p>
                    Congratulations on completing [Event Name]! Your certificate
                    is attached to this email.
                  </p>
                  <div className="flex items-center space-x-2 p-3 bg-white rounded border border-gray-200">
                    <Award className="w-5 h-5 text-[#4285F4]" />
                    <span className="text-sm">certificate.pdf</span>
                    <Download className="w-4 h-4 text-gray-400 ml-auto" />
                  </div>
                  <p>Best regards,</p>
                  <p>GDGC Team</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="verification">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Verify Certificate
              </h3>

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Certificate ID
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={verificationId}
                      onChange={(e) => setVerificationId(e.target.value)}
                      placeholder="e.g., CERT-2026-123456"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Verify Certificate
                </button>
              </form>

              {verificationResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mt-6 p-6 rounded-xl ${
                    verificationResult.valid
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className={`w-16 h-16 rounded-full ${
                        verificationResult.valid
                          ? "bg-[#34A853]"
                          : "bg-[#EA4335]"
                      } flex items-center justify-center`}
                    >
                      {verificationResult.valid ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : (
                        <XCircle className="w-8 h-8 text-white" />
                      )}
                    </motion.div>
                  </div>

                  <div className="text-center">
                    <h4
                      className={`text-xl font-semibold mb-2 ${
                        verificationResult.valid
                          ? "text-green-900"
                          : "text-red-900"
                      }`}
                    >
                      {verificationResult.valid
                        ? "Valid Certificate"
                        : "Invalid Certificate"}
                    </h4>

                    {verificationResult.valid ? (
                      <div className="space-y-2 text-sm text-green-800">
                        <div>
                          <span className="font-medium">Participant:</span>{" "}
                          {verificationResult.name}
                        </div>
                        <div>
                          <span className="font-medium">Event:</span>{" "}
                          {verificationResult.event}
                        </div>
                        <div>
                          <span className="font-medium">Issued:</span> March 5,
                          2026
                        </div>
                      </div>
                    ) : (
                      <p className="text-red-800 text-sm">
                        This certificate ID could not be found in our system.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}