/**
 * FRUENDLY ALEXIS | CYBER PORTFOLIO JAVASCRIPT
 * Features: Interactive Terminal CLI, Cert Filter, Toast Copy, Scroll Spy
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCertFilters();
  initCliTerminal();
  initSmoothScroll();
});

/* ==========================================================================
   NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  // Sticky background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Active section scroll spy
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   SMOOTH SCROLLING
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   INTERACTIVE CLI TERMINAL
   ========================================================================== */
const cliCommands = {
  help: `Available commands:<br/>
  - <span class="text-cyan">skills</span>: view core tech stack & competencies<br/>
  - <span class="text-cyan">agents</span>: inspect autonomous AI agent fleet (Max & Mini)<br/>
  - <span class="text-cyan">homelab</span>: inspect Proxmox & UniFi homelab specs<br/>
  - <span class="text-cyan">certs</span>: list active industry certifications<br/>
  - <span class="text-cyan">projects</span>: list highlighted technical builds<br/>
  - <span class="text-cyan">contact</span>: get transmission channels & email<br/>
  - <span class="text-cyan">whoami</span>: display operator identity<br/>
  - <span class="text-cyan">clear</span>: wipe terminal history`,

  skills: `Core Capabilities:<br/>
  - <span class="text-emerald">Cloud/IaC</span>: GCP, Docker, Docker Compose, Terraform, Ansible, Linux<br/>
  - <span class="text-emerald">AI & Automation</span>: Autonomous agents (Max/Mini), Claude GenAI, Ollama, Python, AppScript<br/>
  - <span class="text-emerald">Fleet Ops</span>: Jamf Pro, Microsoft Intune, 400+ endpoints<br/>
  - <span class="text-emerald">Security</span>: HackerOne triage, 2FA bypass defense, Sophos EDR, IAM, Least Privilege`,

  agents: `Autonomous Agent Network:<br/>
  - <span class="text-cyan">Node [max-agent]</span>: Proxmox LXC agent with direct hypervisor, UniFi, and Snipe-IT ITAM telemetry for 24/7 homelab ops.<br/>
  - <span class="text-cyan">Node [mini]</span>: Apple Silicon M1 edge node handling secure message dispatching & edge bridging.<br/>
  - <span class="text-cyan">Inference & Governance</span>: Local LLM (RTX 3080 / Ollama) + Claude tool-calling pipelines with human-in-the-loop security gates.`,

  ai: `Autonomous Agent Network:<br/>
  - <span class="text-cyan">Node [max-agent]</span>: Proxmox LXC agent with direct hypervisor, UniFi, and Snipe-IT ITAM telemetry for 24/7 homelab ops.<br/>
  - <span class="text-cyan">Node [mini]</span>: Apple Silicon M1 edge node handling secure message dispatching & edge bridging.<br/>
  - <span class="text-cyan">Inference & Governance</span>: Local LLM (RTX 3080 / Ollama) + Claude tool-calling pipelines with human-in-the-loop security gates.`,

  homelab: `Homelab Environment:<br/>
  - <span class="text-cyan">Hypervisor</span>: Proxmox VE (owl-prox) with LXCs and VMs<br/>
  - <span class="text-cyan">Network</span>: UniFi Gateway Ultra (UCG Ultra), isolated VLANs<br/>
  - <span class="text-cyan">Remote Access</span>: Twingate SDP + Cloudflare Zero Trust Tunnels<br/>
  - <span class="text-cyan">Services</span>: NPM (SSL), Portainer, Nextcloud, MariaDB, Home Assistant`,

  certs: `Active Certifications:<br/>
  - Google Cloud Certified Associate Cloud Engineer (GCCA)<br/>
  - CompTIA PenTest+, CySA+, Security+, Network+, Project+, A+<br/>
  - (ISC)² SSCP (Systems Security Certified Practitioner)`,

  projects: `Highlighted Deployments:<br/>
  - <span class="text-cyan">Docker Self-Hosted Lab</span>: IaC Terraform + Docker stack (github.com/Frulexi/self_hosted)<br/>
  - <span class="text-cyan">Apple Card to CSV</span>: Flask + OCR parsing web app (appletrans.landingsnet.com)<br/>
  - <span class="text-cyan">Turnkey Homelabs</span>: Pre-configured Proxmox micro server appliances`,

  contact: `Transmission Coordinates:<br/>
  - Email: <a href="mailto:fruendly@landingsnet.com" class="text-cyan">fruendly@landingsnet.com</a><br/>
  - LinkedIn: <a href="https://www.linkedin.com/in/fruendly-alexis-a348a8152" target="_blank" class="text-cyan">linkedin.com/in/fruendly-alexis</a><br/>
  - GitHub: <a href="https://github.com/Frulexi" target="_blank" class="text-cyan">github.com/Frulexi</a>`,

  whoami: `Fruendly Alexis — Senior Tech Ops Specialist (SecOps & Systems), Cybersecurity Practitioner.`,

  sudo: `Permission denied: you are already in guest operational mode. Use 'help' to navigate.`,

  uname: `Linux fruendly-ops 6.17.13-2-pve #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`,

  clear: 'CLEAR'
};

function initCliTerminal() {
  const cliInput = document.getElementById('cliInput');
  if (!cliInput) return;

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = cliInput.value.trim().toLowerCase();
      if (val) {
        executeCommand(val);
      }
      cliInput.value = '';
    }
  });
}

function handleCliCommand(e) {
  if (e) e.preventDefault();
  const cliInput = document.getElementById('cliInput');
  if (!cliInput) return;
  const val = cliInput.value.trim().toLowerCase();
  if (val) {
    executeCommand(val);
  }
  cliInput.value = '';
}

function runQuickCommand(cmd) {
  executeCommand(cmd);
  const cliInput = document.getElementById('cliInput');
  if (cliInput) {
    cliInput.focus();
  }
}

function executeCommand(cmd) {
  const history = document.getElementById('cliHistory');
  if (!history) return;

  if (cmd === 'clear') {
    history.innerHTML = '';
    return;
  }

  const responseText = cliCommands[cmd] || `Command not found: '${escapeHtml(cmd)}'. Type <span class="text-cyan">'help'</span> for instructions.`;

  const lineEl = document.createElement('div');
  lineEl.className = 'cli-line';
  lineEl.innerHTML = `
    <span class="cli-prompt">fruendly@ops:~$</span> <span class="cli-cmd">${escapeHtml(cmd)}</span>
    <div class="cli-resp">${responseText}</div>
  `;

  history.appendChild(lineEl);
  history.scrollTop = history.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ==========================================================================
   CERTIFICATION FILTERING
   ========================================================================= */
function initCertFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const certCards = document.querySelectorAll('.cert-card');

  if (!filterTabs.length || !certCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      certCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   CLIPBOARD & TOAST
   ========================================================================= */
function copyToClipboard(text, message = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(() => {
      fallbackCopy(text, message);
    });
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(message);
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textArea);
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('cyberToast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast) return;

  if (toastMsg) toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Make functions globally available for inline onclicks
window.handleCliCommand = handleCliCommand;
window.runQuickCommand = runQuickCommand;
window.copyToClipboard = copyToClipboard;
window.showToast = showToast;
