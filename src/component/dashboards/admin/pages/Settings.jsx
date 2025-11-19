import React, { useState } from 'react';
import {
  FaSave,
  FaBell,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaDatabase,
  FaServer,
  FaGlobe,
  FaCreditCard,
  FaFileInvoice,
  FaUserShield,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaCheckCircle,
  FaTimesCircle,
  FaFileAlt,
  FaGavel,
  FaUserLock,
  FaHistory,
  FaBan
} from 'react-icons/fa';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
      },
      ipWhitelist: false,
      loginAttempts: 5,
      lockoutDuration: 30,
    },
    compliance: {
      gdprEnabled: true,
      dataRetention: 365,
      auditLogging: true,
      encryption: true,
      privacyPolicy: true,
      termsOfService: true,
    },
    accessControl: {
      roleBasedAccess: true,
      permissionLevels: 'strict',
    },
    fraudPrevention: {
      enabled: true,
      suspiciousActivityAlerts: true,
      transactionMonitoring: true,
      riskThreshold: 'medium',
    },
    general: {
      language: 'en',
      timezone: 'Asia/Kolkata',
      currency: 'INR',
    },
  });

  // Mock security events
  const securityEvents = [
    { id: 1, type: 'failed_login', user: 'admin@example.com', ip: '192.168.1.100', timestamp: '2024-01-15 10:30:00', severity: 'medium' },
    { id: 2, type: 'suspicious_activity', user: 'vendor@example.com', ip: '192.168.1.101', timestamp: '2024-01-15 09:15:00', severity: 'high' },
    { id: 3, type: 'password_change', user: 'user@example.com', ip: '192.168.1.102', timestamp: '2024-01-14 16:45:00', severity: 'low' },
    { id: 4, type: 'permission_change', user: 'admin@example.com', ip: '192.168.1.100', timestamp: '2024-01-14 14:20:00', severity: 'high' },
  ];

  // Mock role permissions
  const rolePermissions = [
    { role: 'Super Admin', users: 3, permissions: ['All Permissions'] },
    { role: 'Admin', users: 5, permissions: ['User Management', 'Order Management', 'Product Management'] },
    { role: 'Support Agent', users: 12, permissions: ['Support Tickets', 'Customer View'] },
    { role: 'Analyst', users: 2, permissions: ['Analytics', 'Reports'] },
  ];

  const handleSave = () => {
    // Save settings logic
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">System Settings</h3>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <FaSave /> Save Changes
        </button>
      </div>

      {/* General Settings */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaGlobe className="text-blue-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">General Settings</h4>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={settings.general.language}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, language: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={settings.general.timezone}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, timezone: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={settings.general.currency}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, currency: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaShieldAlt className="text-green-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Security Settings</h4>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Two-Factor Authentication</label>
              <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactor}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, twoFactor: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="5"
              max="120"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaBell className="text-purple-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Notification Settings</h4>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-gray-600" />
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
                <p className="text-xs text-gray-500">Receive updates via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaBell className="text-gray-600" />
              <div>
                <label className="block text-sm font-medium text-gray-700">SMS Notifications</label>
                <p className="text-xs text-gray-500">Receive updates via SMS</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, sms: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaBell className="text-gray-600" />
              <div>
                <label className="block text-sm font-medium text-gray-700">Push Notifications</label>
                <p className="text-xs text-gray-500">Receive browser push notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, push: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Enhanced Security Settings */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaLock className="text-red-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Enhanced Security</h4>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
            <div className="space-y-2 pl-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Minimum Length</span>
                <input
                  type="number"
                  value={settings.security.passwordPolicy.minLength}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      passwordPolicy: {
                        ...settings.security.passwordPolicy,
                        minLength: parseInt(e.target.value)
                      }
                    }
                  })}
                  className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                  min="6"
                  max="20"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Require Uppercase</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireUppercase}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: {
                          ...settings.security.passwordPolicy,
                          requireUppercase: e.target.checked
                        }
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Require Numbers</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireNumbers}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: {
                          ...settings.security.passwordPolicy,
                          requireNumbers: e.target.checked
                        }
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Require Special Characters</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireSpecialChars}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: {
                          ...settings.security.passwordPolicy,
                          requireSpecialChars: e.target.checked
                        }
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
              <input
                type="number"
                value={settings.security.loginAttempts}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, loginAttempts: parseInt(e.target.value) }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                min="3"
                max="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lockout Duration (minutes)</label>
              <input
                type="number"
                value={settings.security.lockoutDuration}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, lockoutDuration: parseInt(e.target.value) }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                min="5"
                max="60"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IP Whitelist</label>
              <p className="text-xs text-gray-500">Restrict access to specific IP addresses</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.ipWhitelist}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, ipWhitelist: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Fraud Prevention */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaExclamationTriangle className="text-orange-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Fraud Prevention</h4>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enable Fraud Detection</label>
              <p className="text-xs text-gray-500">Monitor and prevent fraudulent activities</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.fraudPrevention.enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  fraudPrevention: { ...settings.fraudPrevention, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Suspicious Activity Alerts</label>
              <p className="text-xs text-gray-500">Get notified of suspicious activities</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.fraudPrevention.suspiciousActivityAlerts}
                onChange={(e) => setSettings({
                  ...settings,
                  fraudPrevention: { ...settings.fraudPrevention, suspiciousActivityAlerts: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Monitoring</label>
              <p className="text-xs text-gray-500">Monitor all transactions for fraud</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.fraudPrevention.transactionMonitoring}
                onChange={(e) => setSettings({
                  ...settings,
                  fraudPrevention: { ...settings.fraudPrevention, transactionMonitoring: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Risk Threshold</label>
            <select
              value={settings.fraudPrevention.riskThreshold}
              onChange={(e) => setSettings({
                ...settings,
                fraudPrevention: { ...settings.fraudPrevention, riskThreshold: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Protection & Privacy */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaFileAlt className="text-blue-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Data Protection & Privacy</h4>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GDPR Compliance</label>
              <p className="text-xs text-gray-500">Enable GDPR data protection features</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.compliance.gdprEnabled}
                onChange={(e) => setSettings({
                  ...settings,
                  compliance: { ...settings.compliance, gdprEnabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Encryption</label>
              <p className="text-xs text-gray-500">Encrypt sensitive data at rest and in transit</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.compliance.encryption}
                onChange={(e) => setSettings({
                  ...settings,
                  compliance: { ...settings.compliance, encryption: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audit Logging</label>
              <p className="text-xs text-gray-500">Log all system activities for compliance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.compliance.auditLogging}
                onChange={(e) => setSettings({
                  ...settings,
                  compliance: { ...settings.compliance, auditLogging: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Period (days)</label>
            <input
              type="number"
              value={settings.compliance.dataRetention}
              onChange={(e) => setSettings({
                ...settings,
                compliance: { ...settings.compliance, dataRetention: parseInt(e.target.value) }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              min="30"
              max="3650"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FaFileAlt />
              View Privacy Policy
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FaGavel />
              View Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Role-Based Access Control */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaUserShield className="text-purple-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">Role-Based Access Control</h4>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enable RBAC</label>
              <p className="text-xs text-gray-500">Control access based on user roles</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.accessControl.roleBasedAccess}
                onChange={(e) => setSettings({
                  ...settings,
                  accessControl: { ...settings.accessControl, roleBasedAccess: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Permission Level</label>
            <select
              value={settings.accessControl.permissionLevels}
              onChange={(e) => setSettings({
                ...settings,
                accessControl: { ...settings.accessControl, permissionLevels: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="strict">Strict</option>
              <option value="moderate">Moderate</option>
              <option value="relaxed">Relaxed</option>
            </select>
          </div>
          <div className="mt-4">
            <h5 className="text-sm font-semibold text-gray-700 mb-3">Role Permissions Overview</h5>
            <div className="space-y-2">
              {rolePermissions.map((role, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{role.role}</p>
                    <p className="text-xs text-gray-600">{role.users} users</p>
                  </div>
                  <div className="text-xs text-gray-600">
                    {role.permissions.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Security Events Log */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FaHistory className="text-indigo-600 text-xl" />
            <h4 className="font-semibold text-gray-900 text-lg">Recent Security Events</h4>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="space-y-2">
          {securityEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {event.severity === 'high' && <FaExclamationTriangle className="text-red-600" />}
                {event.severity === 'medium' && <FaExclamationTriangle className="text-yellow-600" />}
                {event.severity === 'low' && <FaCheckCircle className="text-green-600" />}
                <div>
                  <p className="text-sm font-medium text-gray-900">{event.type.replace('_', ' ')}</p>
                  <p className="text-xs text-gray-600">{event.user} • {event.ip}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{event.timestamp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System Information */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaServer className="text-orange-600 text-xl" />
          <h4 className="font-semibold text-gray-900 text-lg">System Information</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Database Status</p>
            <p className="text-sm font-semibold text-green-600">Operational</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">API Status</p>
            <p className="text-sm font-semibold text-green-600">Healthy</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Server Load</p>
            <p className="text-sm font-semibold text-gray-900">42%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Uptime</p>
            <p className="text-sm font-semibold text-gray-900">99.9%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
