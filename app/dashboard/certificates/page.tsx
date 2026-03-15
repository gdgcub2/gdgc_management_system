"use client";

// Animation library
import { motion } from "motion/react";

// Lucide icons
import {
  Award,
  Download,
  Mail,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";

// React hooks
import { useState } from "react";

// Radix UI components for toggles and tabs
import * as Switch from "@radix-ui/react-switch";
import * as Tabs from "@radix-ui/react-tabs";

// Font options for certificate customization
const fontOptions = [
  { label: "Serif", value: "font-serif" },
  { label: "Sans Serif", value: "font-sans" },
  { label: "Monospace", value: "font-mono" },
];

// Background options for certificate customization
const backgroundOptions = [
  { label: "White", preview: "bg-white", cert: "bg-white" },
  { label: "Blue", preview: "bg-gradient-to-br from-blue-50 to-blue-100", cert: "bg-gradient-to-br from-blue-50 to-blue-100" },
  { label: "Green", preview: "bg-gradient-to-br from-green-50 to-green-100", cert: "bg-gradient-to-br from-green-50 to-green-100" },
];

export default function CertificatesPage() {
  // Auto-generate certificates after attendance toggle
  const [autoGenerate, setAutoGenerate] = useState(true);

  // Auto-email delivery toggle
  const [autoEmail, setAutoEmail] = useState(true);

  // Certificate ID entered in the verification form
  const [verificationId, setVerificationId] = useState("");

  // Selected font for the certificate preview
  const [selectedFont, setSelectedFont] = useState(fontOptions[0].value);

  // Selected background index for the certificate preview
  const [selectedBg, setSelectedBg] = useState(0);

  // Result of the certificate verification — valid or invalid
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    name?: string;
    event?: string;
  } | null>(null);

  // Handle certificate verification form submission
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
    <div className="space-y-4 md:space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900">Certificate Automation</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Design, generate, and verify certificates</p>
      </div>

      {/* ── TABS: Designer / Automation / Verification ── */}
      <Tabs.Root defaultValue="designer" className="space-y-4 md:space-y-6">

        {/* Tab triggers */}
        <Tabs.List className="flex space-x-1 md:space-x-2 bg-white rounded-lg p-1 border border-gray-200 w-fit">
          {["designer", "automation", "verification"].map((tab) => (
            <Tabs.Trigger
              key={tab}
              value={tab}
              className="px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors capitalize data-[state=active]:bg-[#4285F4] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
            >
              {tab}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* ── DESIGNER TAB ── */}
        <Tabs.Content value="designer">
          {/* Responsive: 1 col on mobile, 3 cols on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

            {/* Certificate preview — takes 2 cols on lg */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white rounded-2xl p-4 md:p-8 border border-gray-200 shadow-sm"
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Certificate Preview</h3>

              {/* Live preview with selected font and background */}
              <div className={`${backgroundOptions[selectedBg].cert} ${selectedFont} border-4 border-[#4285F4] rounded-xl p-4 md:p-12 aspect-[1.4/1] relative`}>
                <div className="text-center mb-4 md:mb-8">
                  <div className="flex justify-center mb-2 md:mb-4">
                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] flex items-center justify-center">
                      <Award className="w-5 h-5 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-base md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
                    Certificate of Completion
                  </h2>
                  <div className="text-xs md:text-sm text-gray-600">This is to certify that</div>
                </div>

                <div className="text-center mb-3 md:mb-6">
                  <div className="text-sm md:text-4xl font-bold text-[#4285F4] mb-1 md:mb-2 border-b-2 border-[#4285F4] inline-block px-4 md:px-8 pb-1 md:pb-2">
                    [Participant Name]
                  </div>
                </div>

                <div className="text-center mb-4 md:mb-8">
                  <p className="text-xs md:text-base text-gray-700 mb-1 md:mb-2">has successfully completed the</p>
                  <p className="text-xs md:text-xl font-semibold text-gray-900">[Event Name]</p>
                  <p className="text-xs md:text-base text-gray-600 mt-1 md:mt-2">[Date]</p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="text-xs text-gray-600">Certificate ID: [ID]</div>
                  <div className="text-center">
                    <div className="border-t-2 border-gray-300 pt-1 md:pt-2 px-4 md:px-8">
                      <div className="font-semibold text-gray-900 text-xs md:text-base">Organizer</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 w-10 h-10 md:w-16 md:h-16 bg-white border border-gray-300 rounded flex items-center justify-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-200" />
                </div>
              </div>
            </motion.div>

            {/* Customization panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Customize</h3>
                <div className="space-y-4">

                  {/* Font selector */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Font Style</label>
                    <select
                      value={selectedFont}
                      onChange={(e) => setSelectedFont(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                    >
                      {fontOptions.map((font) => (
                        <option key={font.value} value={font.value}>{font.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Background selector */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Background</label>
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

                  <button className="w-full py-2 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity text-sm">
                    Save Template
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Tabs.Content>

        {/* ── AUTOMATION TAB ── */}
        <Tabs.Content value="automation">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

            {/* Automation rules toggles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Automation Rules</h3>
              <div className="space-y-3 md:space-y-4">

                {/* Auto-generate toggle */}
                <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900 text-sm md:text-base">Auto-generate after attendance</div>
                    <div className="text-xs md:text-sm text-gray-600">Generate certificates automatically when users check in</div>
                  </div>
                  <Switch.Root
                    checked={autoGenerate}
                    onCheckedChange={setAutoGenerate}
                    className={`relative inline-flex h-5 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors flex-shrink-0 ml-3 ${autoGenerate ? "bg-[#4285F4]" : "bg-gray-300"}`}
                  >
                    <Switch.Thumb className={`inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white transition-transform ${autoGenerate ? "translate-x-5 md:translate-x-6" : "translate-x-1"}`} />
                  </Switch.Root>
                </div>

                {/* Auto-email toggle */}
                <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900 text-sm md:text-base">Auto-email delivery</div>
                    <div className="text-xs md:text-sm text-gray-600">Send certificates via email automatically</div>
                  </div>
                  <Switch.Root
                    checked={autoEmail}
                    onCheckedChange={setAutoEmail}
                    className={`relative inline-flex h-5 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors flex-shrink-0 ml-3 ${autoEmail ? "bg-[#4285F4]" : "bg-gray-300"}`}
                  >
                    <Switch.Thumb className={`inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white transition-transform ${autoEmail ? "translate-x-5 md:translate-x-6" : "translate-x-1"}`} />
                  </Switch.Root>
                </div>
              </div>
            </motion.div>

            {/* Email preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Email Preview</h3>
              <div className="bg-gray-50 rounded-xl p-3 md:p-4 border border-gray-200">
                <div className="flex items-center space-x-3 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-gray-200">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                  <div className="text-xs md:text-sm font-medium text-gray-900">Your Certificate is Ready!</div>
                </div>
                <div className="text-xs md:text-sm text-gray-700 space-y-2 md:space-y-3">
                  <p>Hi [Name],</p>
                  <p>Congratulations on completing [Event Name]! Your certificate is attached to this email.</p>
                  <div className="flex items-center space-x-2 p-2 md:p-3 bg-white rounded border border-gray-200">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-[#4285F4]" />
                    <span className="text-xs md:text-sm">certificate.pdf</span>
                    <Download className="w-3 h-3 md:w-4 md:h-4 text-gray-400 ml-auto" />
                  </div>
                  <p>Best regards,</p>
                  <p>GDGC Team</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Tabs.Content>

        {/* ── VERIFICATION TAB ── */}
        <Tabs.Content value="verification">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-5 md:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-lg md:text-2xl font-semibold text-gray-900 mb-5 md:mb-6 text-center">
                Verify Certificate
              </h3>

              {/* Verification form */}
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Enter Certificate ID
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    <input
                      type="text"
                      value={verificationId}
                      onChange={(e) => setVerificationId(e.target.value)}
                      placeholder="e.g., CERT-2026-123456"
                      className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 md:py-3 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm md:text-base"
                >
                  Verify Certificate
                </button>
              </form>

              {/* Verification result */}
              {verificationResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mt-5 md:mt-6 p-4 md:p-6 rounded-xl ${
                    verificationResult.valid
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-center mb-3 md:mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${
                        verificationResult.valid ? "bg-[#34A853]" : "bg-[#EA4335]"
                      } flex items-center justify-center`}
                    >
                      {verificationResult.valid ? (
                        <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      ) : (
                        <XCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      )}
                    </motion.div>
                  </div>
                  <div className="text-center">
                    <h4 className={`text-lg md:text-xl font-semibold mb-2 ${
                      verificationResult.valid ? "text-green-900" : "text-red-900"
                    }`}>
                      {verificationResult.valid ? "Valid Certificate" : "Invalid Certificate"}
                    </h4>
                    {verificationResult.valid ? (
                      <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-green-800">
                        <div><span className="font-medium">Participant:</span> {verificationResult.name}</div>
                        <div><span className="font-medium">Event:</span> {verificationResult.event}</div>
                        <div><span className="font-medium">Issued:</span> March 5, 2026</div>
                      </div>
                    ) : (
                      <p className="text-red-800 text-xs md:text-sm">
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