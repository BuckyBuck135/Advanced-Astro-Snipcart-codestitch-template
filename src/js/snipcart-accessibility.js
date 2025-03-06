// Constants
const MODAL_RENDER_DELAY = 100;
const ANNOUNCEMENT_DURATION = 1000;
const SELECTORS = {
  CART_MODAL: ".snipcart-layout__content",
  SIGN_IN_MODAL: ".snipcart-signin",
  MODAL_CONTAINER: ".snipcart-modal__container",
  MODAL: ".snipcart-modal",
  CLOSE_BUTTON: ".snipcart-cart__secondary-header button",
  SIGN_IN_BUTTONS: ".snipcart-sign-in-button",
  CHECKOUT_FORM: ".snipcart-form",
  SITE_LOGO: "#cs-navigation a"
};

// Helper functions
function getElement(selector) {
  return document.querySelector(selector);
}

function getAllElements(selector) {
  return document.querySelectorAll(selector);
}

function getFocusableElements(container) {
  return container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
}

// Focus management
function setFocusOnFirstElement(containerSelector) {
  const container = getElement(containerSelector);
  if (!container) return;
  
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
}

// ARIA attribute management
function setAriaAttributes(modal) {
  if (!modal) return;
  
  // Set dialog role and properties
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "cart-title");
  
  // Set title ID for proper labeling
  const title = modal.querySelector("h1");
  if (title && !title.id) {
    title.id = "cart-title";
  }
  
  // Set aria-live on container
  const modalContainer = getElement(SELECTORS.MODAL_CONTAINER);
  if (modalContainer && !modalContainer.hasAttribute("aria-live")) {
    modalContainer.setAttribute("aria-live", "polite");
  }
  
  // Set aria-label on close button
  const closeButton = getElement(SELECTORS.CLOSE_BUTTON);
  if (closeButton && !closeButton.hasAttribute("aria-label")) {
    closeButton.setAttribute("aria-label", "Close cart");
  }
}

// Keyboard navigation
function trapFocus(modal) {
  if (!modal) return;
  
  const focusableElements = getFocusableElements(modal);
  if (focusableElements.length === 0) return;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      // Handle focus trapping
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    } else if (e.key === "Escape") {
      // Close modal and return focus
      Snipcart.api.theme.cart.close();
      const siteLogo = getElement(SELECTORS.SITE_LOGO);
      if (siteLogo) siteLogo.focus();
    }
  });
}

// Main functionality
function setupCartAccessibility() {
  setTimeout(() => {
    const cartModal = getElement(SELECTORS.CART_MODAL);
    if (!cartModal) return;
    
    setFocusOnFirstElement(SELECTORS.CART_MODAL);
    setAriaAttributes(cartModal);
    trapFocus(cartModal);
  }, MODAL_RENDER_DELAY);
}

function setupSignInAccessibility() {
  setTimeout(() => {
    const signInModal = getElement(SELECTORS.MODAL);
    if (!signInModal) return;
    
    setFocusOnFirstElement(SELECTORS.SIGN_IN_MODAL);
    setAriaAttributes(signInModal);
    trapFocus(signInModal);
  }, MODAL_RENDER_DELAY);
}

// Event handlers
function handleSignInEvent(event) {
  if (event.type === "click" || event.key === "Enter" || event.key === " ") {
    setupSignInAccessibility();
  }
}

// Create and set up live region for screen reader announcements
function createLiveRegion() {
  // Check if live region already exists
  if (getElement('#cart-announcer')) return getElement('#cart-announcer');
  
  const liveRegion = document.createElement('div');
  liveRegion.id = 'cart-announcer';
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.setAttribute('class', 'sr-only'); // Visually hidden but available to screen readers
  liveRegion.style.cssText = 'position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;';
  document.body.appendChild(liveRegion);
  
  return liveRegion;
}

// Announce messages to screen readers
function announce(message) {
  const liveRegion = createLiveRegion();
  liveRegion.textContent = message;
  setTimeout(() => { liveRegion.textContent = ''; }, ANNOUNCEMENT_DURATION);
}

// Announce cart changes
function setupCartAnnouncements() {
  Snipcart.events.on('item.added', (item) => {
    announce(`${item.name} added to cart. Your cart now contains ${Snipcart.store.getState().cart.items.count} items.`);
  });
  
  Snipcart.events.on('item.removed', (item) => {
    announce(`${item.name} removed from cart.`);
  });
  
  Snipcart.events.on('item.updated', (item) => {
    announce(`${item.name} quantity updated to ${item.quantity}.`);
  });
  
  Snipcart.events.on('cart.ready', () => {
    const itemCount = Snipcart.store.getState().cart.items.count;
    if (itemCount > 0) {
      announce(`Cart opened. You have ${itemCount} items in your cart.`);
    } else {
      announce('Cart opened. Your cart is empty.');
    }
  });
}

// Add keyboard shortcuts
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Alt+C to open cart
    if (e.altKey && e.key === 'c') {
      e.preventDefault();
      Snipcart.api.theme.cart.open();
	  setupCartAccessibility();
      announce('Cart opened via keyboard shortcut');
    }
  });
}

// Initialize all accessibility features
function initAccessibility() {
  Snipcart.events.on("summary.checkout_clicked", setupCartAccessibility);
  
  getAllElements(SELECTORS.SIGN_IN_BUTTONS).forEach((button) => {
    button.addEventListener("click", handleSignInEvent);
    button.addEventListener("keydown", handleSignInEvent);
  });
  
  setupCartAnnouncements();
  setupKeyboardShortcuts();
}

// Initialize when Snipcart is ready
document.addEventListener("snipcart.ready", initAccessibility);
