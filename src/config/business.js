/**
 * Business Configuration
 * Centralized business information that can be customized for different companies
 */

function getBusinessConfig() {
  return {
    // Business name - default is Tazza Pizza (can be overridden via environment variable)
    name: process.env.BUSINESS_NAME || 'Tazza Pizza',
    
    // Business location - can be overridden via environment variable
    location: process.env.BUSINESS_LOCATION || 'Your City, State',
    
    // Tax rate (default 8%)
    taxRate: parseFloat(process.env.TAX_RATE || '0.08'),
    
    // Phone number format (optional)
    phoneNumber: process.env.BUSINESS_PHONE || null
  };
}

/**
 * Get business name
 */
function getBusinessName() {
  return getBusinessConfig().name;
}

/**
 * Get business location
 */
function getBusinessLocation() {
  return getBusinessConfig().location;
}

/**
 * Get tax rate
 */
function getTaxRate() {
  return getBusinessConfig().taxRate;
}

module.exports = {
  getBusinessConfig,
  getBusinessName,
  getBusinessLocation,
  getTaxRate
};

