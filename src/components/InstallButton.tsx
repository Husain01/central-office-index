"use client";

import { useState, useEffect } from "react";
import { Download, X, Smartphone, Monitor } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showManualInstructions, setShowManualInstructions] = useState(true);

  useEffect(() => {
    // Check if app is already installed (running in standalone mode)
    const checkStandalone = () => {
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        ("standalone" in window.navigator &&
          (window.navigator as { standalone?: boolean }).standalone === true)
      );
    };

    setIsStandalone(checkStandalone());

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallBanner(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setShowInstallBanner(false);
      }
    } catch (error) {
      console.error("Error during install prompt:", error);
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
  };

  const handleDismissManual = () => {
    setShowManualInstructions(false);
  };

  // Don't show if already installed or manually dismissed
  if (isStandalone) {
    return null;
  }

  // Don't show manual instructions if dismissed
  if (!showManualInstructions && !deferredPrompt) {
    return null;
  }

  // Install banner for when prompt is available
  if (showInstallBanner && deferredPrompt) {
    return (
      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg border border-blue-300 p-4 text-white">
          <div className="flex items-start gap-3">
            <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
              <Download className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-sm mb-1">
                📱 Install Ashara Central Office
              </h3>
              <p className="text-blue-100 text-xs mb-3">
                Get instant access and work offline! Install our app for the
                best experience.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleInstallClick}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium text-xs px-4 py-2 rounded-lg transition-colors"
                >
                  Install Now
                </button>
                <button
                  onClick={handleDismiss}
                  className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-2 rounded-lg transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white flex-shrink-0 ml-2"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Manual install instructions for other cases
  const getInstallInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
      return {
        icon: <Smartphone className="h-4 w-4" />,
        title: "Install on iOS",
        steps: ["Tap the Share button", "Select 'Add to Home Screen'"],
      };
    } else if (userAgent.includes("chrome")) {
      return {
        icon: <Monitor className="h-4 w-4" />,
        title: "Install on Chrome",
        steps: ["Click the menu (⋮)", "Select 'Install app'"],
      };
    } else {
      return {
        icon: <Download className="h-4 w-4" />,
        title: "Install App",
        steps: ["Look for install option in your browser menu"],
      };
    }
  };

  const instructions = getInstallInstructions();

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
          {instructions.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-blue-900 mb-1">
            📱 {instructions.title}
          </h3>
          <p className="text-xs text-blue-600 mb-2">
            Install for faster access and offline functionality
          </p>
          <div className="text-sm text-blue-700 space-y-1">
            {instructions.steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full text-xs flex items-center justify-center font-medium">
                  {index + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleDismissManual}
          className="text-blue-400 hover:text-blue-600 flex-shrink-0 ml-2"
          title="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
