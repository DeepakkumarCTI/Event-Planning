import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  Globe,
  Lock,
  Mail,
  Save,
  Settings,
  ShieldCheck,
  Store,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

import Button from "../../components/common/Button";

const SETTINGS_STORAGE_KEY =
  "functionPlannerAdminSettings";

const DEFAULT_SETTINGS = {
  platformName: "FunctionPlanner",
  supportEmail: "hello@functionplanner.com",
  supportPhone: "+91 98765 43210",
  location: "Chennai, Tamil Nadu, India",
  currency: "INR",
  timezone: "Asia/Kolkata",

  adminName: "Administrator",
  adminEmail: "admin@functionplanner.com",

  emailNotifications: true,
  bookingNotifications: true,
  paymentNotifications: true,
  enquiryNotifications: true,

  requireBookingConfirmation: true,
  allowCustomerRegistration: true,
};

const AdminSettings = () => {
  const [settings, setSettings] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            SETTINGS_STORAGE_KEY
          );

        return saved
          ? {
              ...DEFAULT_SETTINGS,
              ...JSON.parse(saved),
            }
          : DEFAULT_SETTINGS;
      } catch {
        return DEFAULT_SETTINGS;
      }
    });

  const [activeSection, setActiveSection] =
    useState("general");

  const [saved, setSaved] =
    useState(false);

  const [passwordForm, setPasswordForm] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [passwordMessage, setPasswordMessage] =
    useState("");

  /* =========================================================
     SAVE SETTINGS
  ========================================================= */

  const saveSettings = () => {
    try {
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(settings)
      );

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch {
      // Ignore localStorage errors.
    }
  };

  /* =========================================================
     INPUT HELPERS
  ========================================================= */

  const updateSetting = (
    key,
    value
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const updatePassword = (
    key,
    value
  ) => {
    setPasswordForm((current) => ({
      ...current,
      [key]: value,
    }));

    setPasswordMessage("");
  };

  /* =========================================================
     PASSWORD
  ========================================================= */

  const handlePasswordChange = (
    event
  ) => {
    event.preventDefault();

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setPasswordMessage(
        "Please complete all password fields."
      );
      return;
    }

    if (
      passwordForm.newPassword.length <
      6
    ) {
      setPasswordMessage(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      setPasswordMessage(
        "New password and confirmation do not match."
      );
      return;
    }

    /*
      This UI stores a local demo password marker.
      Real authentication should validate/change the
      password through the backend.
    */
    try {
      localStorage.setItem(
        "functionPlannerAdminPasswordChanged",
        "true"
      );
    } catch {
      // Ignore localStorage errors.
    }

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordMessage(
      "Password update request saved locally."
    );
  };

  /* =========================================================
     SECTIONS
  ========================================================= */

  const sections = [
    {
      id: "general",
      label: "General",
      description:
        "Platform information",
      icon: Store,
    },
    {
      id: "admin",
      label: "Admin Profile",
      description:
        "Administrator details",
      icon: User,
    },
    {
      id: "notifications",
      label: "Notifications",
      description:
        "Email and booking alerts",
      icon: Bell,
    },
    {
      id: "security",
      label: "Security",
      description:
        "Password and access",
      icon: ShieldCheck,
    },
  ];

  return (
    <main className="min-h-full bg-stone-50">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-8"
        >
          <div className="mb-2 flex items-center gap-2 text-amber-700">
            <Settings className="h-4 w-4" />

            <span className="text-xs font-bold uppercase tracking-[0.18em]">
              Administration
            </span>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Settings
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                Manage platform details,
                administrator preferences,
                notifications and security.
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={saveSettings}
              icon={
                saved ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Save className="h-4 w-4" />
                )
              }
            >
              {saved
                ? "Settings Saved"
                : "Save Changes"}
            </Button>
          </div>
        </motion.div>

        {/* ===================================================
            SETTINGS LAYOUT
        =================================================== */}

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <motion.aside
            initial={{
              opacity: 0,
              x: -15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="h-fit rounded-3xl border border-stone-200 bg-white p-3 shadow-sm"
          >
            <div className="mb-3 px-3 py-3">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Settings Menu
              </p>
            </div>

            <div className="space-y-1">
              {sections.map(
                (section) => {
                  const Icon =
                    section.icon;

                  const active =
                    activeSection ===
                    section.id;

                  return (
                    <button
                      key={
                        section.id
                      }
                      type="button"
                      onClick={() =>
                        setActiveSection(
                          section.id
                        )
                      }
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                        active
                          ? "bg-amber-50 text-amber-800"
                          : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? "bg-amber-100 text-amber-700"
                            : "bg-stone-100 text-stone-500"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-bold">
                          {section.label}
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-stone-400">
                          {
                            section.description
                          }
                        </p>
                      </div>
                    </button>
                  );
                }
              )}
            </div>

            <div className="mt-4 border-t border-stone-100 pt-4">
              <div className="rounded-2xl bg-stone-50 p-4">
                <div className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />

                  <div>
                    <p className="text-xs font-bold text-stone-700">
                      Regional Settings
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-stone-400">
                      {settings.currency} •{" "}
                      {settings.timezone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* =================================================
              CONTENT
          ================================================= */}

          <motion.section
            key={activeSection}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="min-w-0"
          >
            {activeSection ===
              "general" && (
              <GeneralSettings
                settings={settings}
                updateSetting={
                  updateSetting
                }
              />
            )}

            {activeSection ===
              "admin" && (
              <AdminProfileSettings
                settings={settings}
                updateSetting={
                  updateSetting
                }
              />
            )}

            {activeSection ===
              "notifications" && (
              <NotificationSettings
                settings={settings}
                updateSetting={
                  updateSetting
                }
              />
            )}

            {activeSection ===
              "security" && (
              <SecuritySettings
                passwordForm={
                  passwordForm
                }
                updatePassword={
                  updatePassword
                }
                passwordMessage={
                  passwordMessage
                }
                onSubmit={
                  handlePasswordChange
                }
              />
            )}
          </motion.section>
        </div>
      </div>
    </main>
  );
};

/* ===========================================================
   GENERAL SETTINGS
=========================================================== */

const GeneralSettings = ({
  settings,
  updateSetting,
}) => (
  <div className="space-y-6">
    <SettingsCard
      title="Platform Information"
      description="Basic information displayed throughout FunctionPlanner."
      icon={Store}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <SettingsField
          label="Platform Name"
          description="Your event planning platform name."
        >
          <input
            value={
              settings.platformName
            }
            onChange={(event) =>
              updateSetting(
                "platformName",
                event.target.value
              )
            }
            className="settings-input"
            placeholder="FunctionPlanner"
          />
        </SettingsField>

        <SettingsField
          label="Support Email"
          description="Primary email for customer support."
        >
          <input
            type="email"
            value={
              settings.supportEmail
            }
            onChange={(event) =>
              updateSetting(
                "supportEmail",
                event.target.value
              )
            }
            className="settings-input"
            placeholder="hello@example.com"
          />
        </SettingsField>

        <SettingsField
          label="Support Phone"
          description="Phone number customers can use for support."
        >
          <input
            type="tel"
            value={
              settings.supportPhone
            }
            onChange={(event) =>
              updateSetting(
                "supportPhone",
                event.target.value
              )
            }
            className="settings-input"
            placeholder="+91 98765 43210"
          />
        </SettingsField>

        <SettingsField
          label="Location"
          description="Primary operating location."
        >
          <input
            value={settings.location}
            onChange={(event) =>
              updateSetting(
                "location",
                event.target.value
              )
            }
            className="settings-input"
            placeholder="Chennai, Tamil Nadu, India"
          />
        </SettingsField>
      </div>
    </SettingsCard>

    <SettingsCard
      title="Regional Preferences"
      description="Configure the currency and timezone used by the platform."
      icon={Globe}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <SettingsField
          label="Currency"
          description="Currency used when displaying prices."
        >
          <select
            value={
              settings.currency
            }
            onChange={(event) =>
              updateSetting(
                "currency",
                event.target.value
              )
            }
            className="settings-input"
          >
            <option value="INR">
              INR — Indian Rupee
            </option>
            <option value="USD">
              USD — US Dollar
            </option>
            <option value="EUR">
              EUR — Euro
            </option>
            <option value="GBP">
              GBP — British Pound
            </option>
          </select>
        </SettingsField>

        <SettingsField
          label="Timezone"
          description="Timezone used for event and booking dates."
        >
          <select
            value={
              settings.timezone
            }
            onChange={(event) =>
              updateSetting(
                "timezone",
                event.target.value
              )
            }
            className="settings-input"
          >
            <option value="Asia/Kolkata">
              Asia/Kolkata
            </option>
            <option value="Asia/Dubai">
              Asia/Dubai
            </option>
            <option value="Asia/Singapore">
              Asia/Singapore
            </option>
            <option value="Europe/London">
              Europe/London
            </option>
            <option value="America/New_York">
              America/New_York
            </option>
            <option value="America/Los_Angeles">
              America/Los_Angeles
            </option>
          </select>
        </SettingsField>
      </div>
    </SettingsCard>

    <SettingsCard
      title="Platform Controls"
      description="Control basic customer and booking behaviour."
      icon={Settings}
    >
      <div className="space-y-3">
        <ToggleRow
          title="Require Booking Confirmation"
          description="New bookings remain pending until an administrator confirms them."
          checked={
            settings.requireBookingConfirmation
          }
          onChange={(value) =>
            updateSetting(
              "requireBookingConfirmation",
              value
            )
          }
        />

        <ToggleRow
          title="Allow Customer Registration"
          description="Allow new customers to create an account."
          checked={
            settings.allowCustomerRegistration
          }
          onChange={(value) =>
            updateSetting(
              "allowCustomerRegistration",
              value
            )
          }
        />
      </div>
    </SettingsCard>
  </div>
);

/* ===========================================================
   ADMIN PROFILE
=========================================================== */

const AdminProfileSettings = ({
  settings,
  updateSetting,
}) => (
  <SettingsCard
    title="Administrator Profile"
    description="Manage the administrator information used by the admin panel."
    icon={User}
  >
    <div className="mb-6 flex items-center gap-4 rounded-2xl border border-stone-100 bg-stone-50 p-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-lg font-bold text-amber-800">
        {getInitials(
          settings.adminName
        )}
      </div>

      <div>
        <p className="text-sm font-bold text-stone-900">
          {settings.adminName}
        </p>

        <p className="mt-1 text-xs text-stone-400">
          Administrator
        </p>
      </div>
    </div>

    <div className="grid gap-5 md:grid-cols-2">
      <SettingsField
        label="Admin Name"
        description="Name displayed in the admin panel."
      >
        <input
          value={settings.adminName}
          onChange={(event) =>
            updateSetting(
              "adminName",
              event.target.value
            )
          }
          className="settings-input"
          placeholder="Administrator"
        />
      </SettingsField>

      <SettingsField
        label="Admin Email"
        description="Administrator login/contact email."
      >
        <input
          type="email"
          value={settings.adminEmail}
          onChange={(event) =>
            updateSetting(
              "adminEmail",
              event.target.value
            )
          }
          className="settings-input"
          placeholder="admin@example.com"
        />
      </SettingsField>
    </div>

    <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4">
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />

        <div>
          <p className="text-sm font-bold text-amber-900">
            Administrator access
          </p>

          <p className="mt-1 text-xs leading-5 text-amber-700">
            Profile details saved here are
            local application preferences.
            Authentication credentials should
            be managed by your backend
            authentication system.
          </p>
        </div>
      </div>
    </div>
  </SettingsCard>
);

/* ===========================================================
   NOTIFICATIONS
=========================================================== */

const NotificationSettings = ({
  settings,
  updateSetting,
}) => (
  <SettingsCard
    title="Notification Preferences"
    description="Choose which administrative alerts should be enabled."
    icon={Bell}
  >
    <div className="space-y-3">
      <ToggleRow
        title="Email Notifications"
        description="Enable administrative email notifications."
        checked={
          settings.emailNotifications
        }
        onChange={(value) =>
          updateSetting(
            "emailNotifications",
            value
          )
        }
      />

      <ToggleRow
        title="Booking Notifications"
        description="Receive alerts when customers create or update bookings."
        checked={
          settings.bookingNotifications
        }
        onChange={(value) =>
          updateSetting(
            "bookingNotifications",
            value
          )
        }
      />

      <ToggleRow
        title="Payment Notifications"
        description="Receive alerts when payment records change."
        checked={
          settings.paymentNotifications
        }
        onChange={(value) =>
          updateSetting(
            "paymentNotifications",
            value
          )
        }
      />

      <ToggleRow
        title="Enquiry Notifications"
        description="Receive alerts for new customer enquiries."
        checked={
          settings.enquiryNotifications
        }
        onChange={(value) =>
          updateSetting(
            "enquiryNotifications",
            value
          )
        }
      />
    </div>

    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-stone-500 shadow-sm">
          <Mail className="h-4 w-4" />
        </div>

        <p className="mt-4 text-xs font-bold text-stone-700">
          Notification Email
        </p>

        <p className="mt-1 break-all text-xs text-stone-400">
          {settings.supportEmail}
        </p>
      </div>

      <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-stone-500 shadow-sm">
          <Bell className="h-4 w-4" />
        </div>

        <p className="mt-4 text-xs font-bold text-stone-700">
          Active Alerts
        </p>

        <p className="mt-1 text-xs text-stone-400">
          {countEnabledNotifications(
            settings
          )}{" "}
          notification categories enabled
        </p>
      </div>
    </div>
  </SettingsCard>
);

/* ===========================================================
   SECURITY
=========================================================== */

const SecuritySettings = ({
  passwordForm,
  updatePassword,
  passwordMessage,
  onSubmit,
}) => (
  <div className="space-y-6">
    <SettingsCard
      title="Change Password"
      description="Update the administrator password."
      icon={Lock}
    >
      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        <SettingsField
          label="Current Password"
          description="Enter your current administrator password."
        >
          <input
            type="password"
            value={
              passwordForm.currentPassword
            }
            onChange={(event) =>
              updatePassword(
                "currentPassword",
                event.target.value
              )
            }
            className="settings-input"
            placeholder="Current password"
            autoComplete="current-password"
          />
        </SettingsField>

        <div className="grid gap-5 md:grid-cols-2">
          <SettingsField
            label="New Password"
            description="Use at least 6 characters."
          >
            <input
              type="password"
              value={
                passwordForm.newPassword
              }
              onChange={(event) =>
                updatePassword(
                  "newPassword",
                  event.target.value
                )
              }
              className="settings-input"
              placeholder="New password"
              autoComplete="new-password"
            />
          </SettingsField>

          <SettingsField
            label="Confirm Password"
            description="Enter the new password again."
          >
            <input
              type="password"
              value={
                passwordForm.confirmPassword
              }
              onChange={(event) =>
                updatePassword(
                  "confirmPassword",
                  event.target.value
                )
              }
              className="settings-input"
              placeholder="Confirm password"
              autoComplete="new-password"
            />
          </SettingsField>
        </div>

        {passwordMessage && (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-xs font-semibold text-stone-600">
            {passwordMessage}
          </div>
        )}

        <div className="flex justify-end border-t border-stone-100 pt-5">
          <Button
            type="submit"
            variant="primary"
            icon={
              <Lock className="h-4 w-4" />
            }
          >
            Update Password
          </Button>
        </div>
      </form>
    </SettingsCard>

    <SettingsCard
      title="Security Information"
      description="Important notes about administrator authentication."
      icon={ShieldCheck}
    >
      <div className="space-y-3">
        <SecurityInfo
          title="Protected Admin Routes"
          description="Administrative pages should remain behind the AdminLayout authentication check."
        />

        <SecurityInfo
          title="Backend Authentication"
          description="For production, password validation and JWT handling should be performed by the backend."
        />

        <SecurityInfo
          title="Local Demo Storage"
          description="Settings stored in localStorage are intended for the current frontend implementation and should not be treated as secure credential storage."
        />
      </div>
    </SettingsCard>
  </div>
);

/* ===========================================================
   SETTINGS CARD
=========================================================== */

const SettingsCard = ({
  title,
  description,
  icon: Icon,
  children,
}) => (
  <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <h2 className="text-base font-bold text-stone-900">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-stone-400">
          {description}
        </p>
      </div>
    </div>

    {children}
  </div>
);

/* ===========================================================
   FIELD
=========================================================== */

const SettingsField = ({
  label,
  description,
  children,
}) => (
  <div>
    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-600">
      {label}
    </label>

    <div>
      {children}
    </div>

    <p className="mt-1.5 text-[10px] leading-4 text-stone-400">
      {description}
    </p>
  </div>
);

/* ===========================================================
   TOGGLE
=========================================================== */

const ToggleRow = ({
  title,
  description,
  checked,
  onChange,
}) => (
  <div className="flex items-center justify-between gap-4 rounded-2xl border border-stone-100 bg-stone-50 p-4">
    <div className="min-w-0">
      <p className="text-sm font-bold text-stone-800">
        {title}
      </p>

      <p className="mt-1 max-w-xl text-xs leading-5 text-stone-400">
        {description}
      </p>
    </div>

    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() =>
        onChange(!checked)
      }
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
        checked
          ? "bg-amber-500"
          : "bg-stone-300"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
          checked
            ? "left-6"
            : "left-1"
        }`}
      />
    </button>
  </div>
);

/* ===========================================================
   SECURITY INFO
=========================================================== */

const SecurityInfo = ({
  title,
  description,
}) => (
  <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
    <div className="flex gap-3">
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />

      <div>
        <p className="text-xs font-bold text-stone-700">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-stone-400">
          {description}
        </p>
      </div>
    </div>
  </div>
);

/* ===========================================================
   HELPERS
=========================================================== */

const getInitials = (name) => {
  const parts = String(
    name || "Admin"
  )
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) {
    return "AD";
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const countEnabledNotifications = (
  settings
) =>
  [
    settings.emailNotifications,
    settings.bookingNotifications,
    settings.paymentNotifications,
    settings.enquiryNotifications,
  ].filter(Boolean).length;

export default AdminSettings;