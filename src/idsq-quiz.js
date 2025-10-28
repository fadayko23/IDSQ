(function () {
  const DEFAULT_CONFIG = {
    mountSelector: '#idsq-root',
    brand: {
      primaryColor: '#006bea',
      accentColor: '#006bea',
      textColor: '#363636',
      fontFamily: "'Montserrat', sans-serif",
      fontUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap',
      logoUrl: null,
    },
    copy: {
      introTitle: 'Discover Your Interior Design Style',
      introDescription: 'Choose the image that resonates with you the most. After three rounds, we will reveal the style that best matches your taste and email you the result.',
      startButton: 'Start Quiz',
      nextButton: 'Next',
      submitButton: 'See My Style',
      loadingMessage: 'Saving your selections…',
      successTitle: 'Your Interior Design Style',
      successDescription: 'Based on your picks, this is the style that suits you best.',
      retryButton: 'Restart Quiz',
      errorTitle: 'Something went wrong',
      errorDescription: 'We were unable to save your result. Please try again.',
    },
    airtable: {
      apiKey: 'YOUR_AIRTABLE_API_KEY',
      baseId: 'YOUR_AIRTABLE_BASE_ID',
      tableName: 'Responses',
      enable: false,
      mapFields: function (payload) {
        return {
          Name: payload.participantName || 'Anonymous',
          Email: payload.email || 'unknown@example.com',
          'Slide 1 Choice': payload.choices[0]?.styleName || '',
          'Slide 2 Choice': payload.choices[1]?.styleName || '',
          'Slide 3 Choice': payload.choices[2]?.styleName || '',
          'Final Style': payload.finalStyle?.styleName || '',
          'Final Style Score': payload.finalStyle?.score || 0,
          'Chosen Styles JSON': JSON.stringify(payload.styleScores),
          Timestamp: new Date().toISOString(),
        };
      },
    },
    leadCapture: {
      enable: true,
      requireEmail: true,
    },
    steps: [
      {
        id: 'round-1',
        prompt: 'Pick the living room that feels like home.',
        options: [
          {
            id: 'coastal-1',
            styleId: 'coastal',
            title: 'Coastal Breeze',
            imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=900&q=80',
          },
          {
            id: 'midcentury-1',
            styleId: 'midcentury',
            title: 'Mid-Century Warmth',
            imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
          },
          {
            id: 'modern-1',
            styleId: 'modern',
            title: 'Modern Minimal',
            imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
          },
        ],
      },
      {
        id: 'round-2',
        prompt: 'Choose a bedroom you would unwind in.',
        options: [
          {
            id: 'boho-1',
            styleId: 'bohemian',
            title: 'Bohemian Retreat',
            imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
          },
          {
            id: 'industrial-1',
            styleId: 'industrial',
            title: 'Industrial Loft',
            imageUrl: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80',
          },
          {
            id: 'coastal-2',
            styleId: 'coastal',
            title: 'Coastal Calm',
            imageUrl: 'https://images.unsplash.com/photo-1505692794403-5f23d2fcf25d?auto=format&fit=crop&w=900&q=80',
          },
        ],
      },
      {
        id: 'round-3',
        prompt: 'Select the dining space you would host friends in.',
        options: [
          {
            id: 'modern-2',
            styleId: 'modern',
            title: 'Modern Gathering',
            imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
          },
          {
            id: 'farmhouse-1',
            styleId: 'farmhouse',
            title: 'Farmhouse Comfort',
            imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
          },
          {
            id: 'boho-2',
            styleId: 'bohemian',
            title: 'Boho Feast',
            imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
          },
        ],
      },
    ],
    styleLibrary: {
      coastal: {
        styleName: 'Coastal',
        description: 'Relaxed vibes, light neutrals, and natural textures inspired by the shoreline.',
        finalImages: [
          'https://images.unsplash.com/photo-1505692794403-5f23d2fcf25d?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=900&q=80',
        ],
      },
      modern: {
        styleName: 'Modern',
        description: 'Clean lines, bold contrasts, and uncluttered silhouettes.',
        finalImages: [
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1505692794403-5f23d2fcf25d?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
        ],
      },
      farmhouse: {
        styleName: 'Modern Farmhouse',
        description: 'Rustic charm blended with contemporary comfort.',
        finalImages: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=900&q=80',
        ],
      },
      industrial: {
        styleName: 'Industrial',
        description: 'Exposed materials, metal finishes, and utilitarian silhouettes.',
        finalImages: [
          'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1470313801617-1c0a42c7637e?auto=format&fit=crop&w=900&q=80',
        ],
      },
      bohemian: {
        styleName: 'Bohemian',
        description: 'Layered textures, collected treasures, and a sense of wanderlust.',
        finalImages: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
        ],
      },
      midcentury: {
        styleName: 'Mid-Century Modern',
        description: 'Organic shapes, warm woods, and iconic vintage accents.',
        finalImages: [
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
        ],
      },
    },
  };

  function deepMerge(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  function createElement(tag, className, attrs = {}) {
    const el = document.createElement(tag);
    if (className) {
      el.className = className;
    }
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        el.setAttribute(key, value);
      }
    });
    return el;
  }

  function injectFont(config) {
    if (!config.brand || !config.brand.fontUrl) return;
    const existing = document.querySelector(`link[href="${config.brand.fontUrl}"]`);
    if (existing) return;
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = config.brand.fontUrl;
    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(link);
  }

  function showSection(mount, section) {
    const previous = mount.firstElementChild;
    if (!previous) {
      mount.innerHTML = '';
      mount.appendChild(section);
      requestAnimationFrame(() => section.classList.add('idsq-animate-in'));
      return;
    }
    previous.classList.remove('idsq-animate-in');
    previous.classList.add('idsq-animate-out');
    previous.addEventListener(
      'animationend',
      () => {
        mount.innerHTML = '';
        mount.appendChild(section);
        requestAnimationFrame(() => section.classList.add('idsq-animate-in'));
      },
      { once: true }
    );
  }

  function renderIntro(config, mount, handlers) {
    const intro = createElement('section', 'idsq-intro');
    const title = createElement('h2', 'idsq-title');
    title.textContent = config.copy.introTitle;
    const description = createElement('p', 'idsq-description');
    description.textContent = config.copy.introDescription;
    const button = createElement('button', 'idsq-button idsq-button-primary');
    button.textContent = config.copy.startButton;
    button.addEventListener('click', handlers.onStart);

    intro.appendChild(title);
    intro.appendChild(description);
    intro.appendChild(button);

    if (config.brand.logoUrl) {
      const logo = createElement('img', 'idsq-logo', {
        src: config.brand.logoUrl,
        alt: 'Brand logo',
      });
      intro.insertBefore(logo, intro.firstChild);
    }

    showSection(mount, intro);
  }

  function renderStep(config, mount, state, handlers) {
    const step = config.steps[state.currentStep];
    const section = createElement('section', 'idsq-step');

    const prompt = createElement('h2', 'idsq-title');
    prompt.textContent = step.prompt;

    const grid = createElement('div', 'idsq-option-grid');

    step.options.forEach((option) => {
      const card = createElement('button', 'idsq-option-card', {
        type: 'button',
      });
      card.addEventListener('click', () => handlers.onSelectOption(option));

      const image = createElement('img', 'idsq-option-image', {
        src: option.imageUrl,
        alt: option.title,
        loading: 'lazy',
      });
      const label = createElement('div', 'idsq-option-label');
      const title = createElement('h3', 'idsq-option-title');
      title.textContent = option.title;

      label.appendChild(title);
      card.appendChild(image);
      card.appendChild(label);
      grid.appendChild(card);
    });

    section.appendChild(prompt);
    section.appendChild(grid);

    showSection(mount, section);
  }

  function renderLeadCapture(config, mount, handlers) {
    const section = createElement('section', 'idsq-lead-capture');
    const title = createElement('h2', 'idsq-title');
    title.textContent = 'Where can we send your results?';

    const form = createElement('form', 'idsq-form');

    const nameField = createInputField('Full Name', 'text', 'participantName');
    const emailField = createInputField('Email', 'email', 'email', config.leadCapture.requireEmail);

    form.appendChild(nameField.wrapper);
    form.appendChild(emailField.wrapper);

    const submit = createElement('button', 'idsq-button idsq-button-primary', { type: 'submit' });
    submit.textContent = config.copy.submitButton;
    form.appendChild(submit);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      if (config.leadCapture.requireEmail && !validateEmail(payload.email)) {
        showFormError(section, 'Please provide a valid email address.');
        return;
      }

      handlers.onSubmitLead(payload);
    });

    section.appendChild(title);
    section.appendChild(form);

    showSection(mount, section);
  }

  function createInputField(labelText, type, name, required = false) {
    const wrapper = createElement('label', 'idsq-field');
    const label = createElement('span', 'idsq-field-label');
    label.textContent = labelText;
    const input = createElement('input', 'idsq-input', { name, type });
    if (required) {
      input.required = true;
      input.setAttribute('required', 'required');
    }
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    return { wrapper, input };
  }

  function showFormError(section, message) {
    let alert = section.querySelector('.idsq-alert');
    if (!alert) {
      alert = createElement('div', 'idsq-alert');
      section.insertBefore(alert, section.firstChild);
    }
    alert.textContent = message;
  }

  function renderFinalSelection(config, mount, state, handlers) {
    const section = createElement('section', 'idsq-final');
    const title = createElement('h2', 'idsq-title');
    title.textContent = 'You gravitated toward these styles.';
    const description = createElement('p', 'idsq-description');
    description.textContent = 'Select the look that feels the most "you" to reveal your final style match.';

    const grid = createElement('div', 'idsq-option-grid');
    state.topStyles.forEach((styleResult) => {
      const styleDefinition = config.styleLibrary[styleResult.styleId];
      if (!styleDefinition) return;
      const card = createElement('button', 'idsq-option-card', { type: 'button' });
      card.addEventListener('click', () => handlers.onSelectFinal(styleResult));

      const gallery = createElement('div', 'idsq-final-gallery');
      styleDefinition.finalImages.slice(0, 3).forEach((url, index) => {
        const img = createElement('img', 'idsq-final-image', {
          src: url,
          alt: `${styleDefinition.styleName} inspiration ${index + 1}`,
          loading: 'lazy',
        });
        gallery.appendChild(img);
      });

      const label = createElement('div', 'idsq-option-label');
      const styleTitle = createElement('h3', 'idsq-option-title');
      styleTitle.textContent = styleDefinition.styleName;
      const styleDescription = createElement('p', 'idsq-option-description');
      styleDescription.textContent = styleDefinition.description;

      label.appendChild(styleTitle);
      label.appendChild(styleDescription);
      card.appendChild(gallery);
      card.appendChild(label);
      grid.appendChild(card);
    });

    section.appendChild(title);
    section.appendChild(description);
    section.appendChild(grid);

    showSection(mount, section);
  }

  function renderLoading(config, mount) {
    const section = createElement('section', 'idsq-status');
    const title = createElement('h2', 'idsq-title');
    title.textContent = config.copy.loadingMessage;
    section.appendChild(title);
    showSection(mount, section);
  }

  function renderError(config, mount, handlers) {
    const section = createElement('section', 'idsq-status');
    const title = createElement('h2', 'idsq-title');
    title.textContent = config.copy.errorTitle;
    const description = createElement('p', 'idsq-description');
    description.textContent = config.copy.errorDescription;
    const retry = createElement('button', 'idsq-button idsq-button-secondary');
    retry.textContent = config.copy.retryButton;
    retry.addEventListener('click', handlers.onRestart);
    section.appendChild(title);
    section.appendChild(description);
    section.appendChild(retry);
    showSection(mount, section);
  }

  function renderSuccess(config, mount, state, handlers) {
    const section = createElement('section', 'idsq-success');
    const title = createElement('h2', 'idsq-title');
    title.textContent = config.copy.successTitle;
    const description = createElement('p', 'idsq-description');
    description.textContent = config.copy.successDescription;

    const card = createElement('article', 'idsq-final-result');
    const gallery = createElement('div', 'idsq-final-gallery');
    state.finalStyle.finalImages.slice(0, 3).forEach((url, index) => {
      const img = createElement('img', 'idsq-final-image', {
        src: url,
        alt: `${state.finalStyle.styleName} inspiration ${index + 1}`,
        loading: 'lazy',
      });
      gallery.appendChild(img);
    });

    const label = createElement('div', 'idsq-option-label');
    const styleTitle = createElement('h3', 'idsq-option-title');
    styleTitle.textContent = state.finalStyle.styleName;
    const styleDescription = createElement('p', 'idsq-option-description');
    styleDescription.textContent = state.finalStyle.description;

    label.appendChild(styleTitle);
    label.appendChild(styleDescription);
    card.appendChild(gallery);
    card.appendChild(label);

    const restart = createElement('button', 'idsq-button idsq-button-secondary');
    restart.textContent = config.copy.retryButton;
    restart.addEventListener('click', handlers.onRestart);

    section.appendChild(title);
    section.appendChild(description);
    section.appendChild(card);
    section.appendChild(restart);

    showSection(mount, section);
  }

  function validateEmail(email) {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
  }

  function calculateTopStyles(config, selections) {
    const scoreMap = selections.reduce((acc, option) => {
      if (!option) return acc;
      const { styleId } = option;
      if (!acc[styleId]) {
        acc[styleId] = { styleId, score: 0 };
      }
      acc[styleId].score += 1;
      return acc;
    }, {});

    const results = Object.values(scoreMap)
      .map((entry) => {
        const definition = config.styleLibrary[entry.styleId];
        return {
          ...entry,
          styleName: definition?.styleName || entry.styleId,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return { results, map: scoreMap };
  }

  async function sendToAirtable(config, payload) {
    if (!config.airtable.enable) {
      return { ok: true, skipped: true };
    }
    const { apiKey, baseId, tableName } = config.airtable;
    if (!apiKey || !baseId || !tableName) {
      throw new Error('Missing Airtable configuration.');
    }
    const fields = typeof config.airtable.mapFields === 'function'
      ? config.airtable.mapFields(payload)
      : payload;

    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Airtable responded with ${response.status}: ${errorText}`);
    }

    return response.json();
  }

  function injectStyles(config) {
    if (document.getElementById('idsq-styles')) return;
    const style = document.createElement('style');
    style.id = 'idsq-styles';
    style.textContent = `
      :root {
        --idsq-primary: ${config.brand.primaryColor};
        --idsq-accent: ${config.brand.accentColor || config.brand.primaryColor};
        --idsq-font: ${config.brand.fontFamily};
        --idsq-text: ${config.brand.textColor || '#363636'};
        --idsq-bg: #ffffff;
        --idsq-black: #000000;
      }
      #idsq {
        font-family: var(--idsq-font);
        color: var(--idsq-text);
        max-width: 960px;
        margin: 0 auto;
        padding: 1.5rem;
        background-color: var(--idsq-bg);
        border-radius: 24px;
        box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
        position: relative;
      }
      #idsq * {
        box-sizing: border-box;
      }
      .idsq-title {
        font-size: clamp(1.6rem, 2vw + 1rem, 2.5rem);
        margin-bottom: 0.75rem;
        color: var(--idsq-text);
        text-align: center;
      }
      .idsq-description {
        font-size: 1rem;
        margin-bottom: 1.5rem;
        color: rgba(54, 54, 54, 0.85);
        text-align: center;
        line-height: 1.5;
      }
      .idsq-button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        border-radius: 9999px;
        padding: 0.85rem 1.75rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.18s ease, box-shadow 0.18s ease;
        border: 2px solid transparent;
      }
      .idsq-button-primary {
        background: var(--idsq-primary);
        color: #ffffff;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      }
      .idsq-button-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
      }
      .idsq-button-secondary {
        background: transparent;
        color: var(--idsq-primary);
        border-color: var(--idsq-primary);
      }
      @keyframes idsqFadeInUp { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
      @keyframes idsqFadeOut { from { opacity: 1 } to { opacity: 0 } }
      .idsq-animate-in { animation: idsqFadeInUp 280ms ease both; }
      .idsq-animate-out { animation: idsqFadeOut 220ms ease both; }
      .idsq-intro,
      .idsq-step,
      .idsq-final,
      .idsq-success,
      .idsq-lead-capture,
      .idsq-status {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .idsq-option-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.25rem;
        width: 100%;
      }
      .idsq-option-card {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        background-color: #f8fafc;
        border-radius: 20px;
        overflow: hidden;
        border: 2px solid transparent;
        cursor: pointer;
        text-align: left;
        transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        padding: 0;
      }
      .idsq-option-card:hover,
      .idsq-option-card:focus {
        transform: translateY(-3px);
        box-shadow: 0 15px 35px rgba(15, 23, 42, 0.18);
        border-color: var(--idsq-accent);
        outline: none;
      }
      .idsq-option-image,
      .idsq-final-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        display: block;
      }
      .idsq-option-label {
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .idsq-option-title {
        font-size: 1.2rem;
        margin: 0;
        color: var(--idsq-text);
      }
      .idsq-option-description {
        font-size: 0.95rem;
        color: rgba(54, 54, 54, 0.85);
        margin: 0;
        line-height: 1.5;
      }
      .idsq-final-gallery {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2px;
        width: 100%;
        background-color: var(--idsq-black);
      }
      .idsq-final-image {
        height: 120px;
      }
      .idsq-logo {
        max-width: 140px;
        margin-bottom: 1.5rem;
      }
      .idsq-form {
        width: min(420px, 100%);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .idsq-field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        text-align: left;
        width: 100%;
      }
      .idsq-field-label {
        font-size: 0.95rem;
        color: var(--idsq-text);
        font-weight: 600;
      }
      .idsq-input {
        width: 100%;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        border: 1px solid #cbd5f5;
        background-color: #fff;
        font-size: 1rem;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .idsq-input:focus {
        border-color: var(--idsq-primary);
        box-shadow: 0 0 0 3px rgba(0, 107, 234, 0.2);
        outline: none;
      }
      /* AI Guide widget */
      .idsq-ai-toggle { position: absolute; right: 16px; bottom: 16px; z-index: 20; }
      .idsq-ai-panel { position: absolute; right: 16px; bottom: 72px; width: min(360px, calc(100% - 32px)); background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; box-shadow: 0 12px 30px rgba(0,0,0,0.18); overflow: hidden; display: none; }
      .idsq-ai-panel.open { display: flex; flex-direction: column; }
      .idsq-ai-header { padding: 0.75rem 1rem; font-weight: 600; color: var(--idsq-text); border-bottom: 1px solid rgba(0,0,0,0.06); }
      .idsq-ai-messages { max-height: 260px; overflow-y: auto; padding: 0.75rem 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
      .idsq-ai-msg { font-size: 0.95rem; line-height: 1.35; padding: 0.5rem 0.75rem; border-radius: 10px; }
      .idsq-ai-msg.user { align-self: flex-end; background: rgba(0, 107, 234, 0.10); color: var(--idsq-text); }
      .idsq-ai-msg.assistant { align-self: flex-start; background: #f3f4f6; color: var(--idsq-text); }
      .idsq-ai-input { display: flex; gap: 0.5rem; padding: 0.75rem; border-top: 1px solid rgba(0,0,0,0.06); }
      .idsq-ai-input input { flex: 1; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.5rem 0.75rem; }
      .idsq-ai-input button { white-space: nowrap; }
      .idsq-alert {
        width: 100%;
        padding: 0.75rem 1rem;
        background-color: rgba(239, 68, 68, 0.12);
        color: #b91c1c;
        border-radius: 12px;
        margin-bottom: 1rem;
      }
      @media (max-width: 640px) {
        #idsq {
          padding: 1.25rem;
        }
        .idsq-option-image {
          height: 160px;
        }
        .idsq-final-image {
          height: 90px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function buildQuiz(userConfig = {}) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    const config = deepMerge(DEFAULT_CONFIG, userConfig);
    const mount = document.querySelector(config.mountSelector);
    if (!mount) {
      console.warn(`[IDSQ] Could not find mount element "${config.mountSelector}".`);
      return;
    }
    mount.id = 'idsq';
    injectFont(config);
    injectStyles(config);

    const state = {
      currentStep: -1,
      choices: [],
      topStyles: [],
      finalStyle: null,
      leadData: {},
    };

    const handlers = {
      onStart() {
        state.currentStep = 0;
        state.choices = [];
        state.finalStyle = null;
        state.topStyles = [];
        renderStep(config, mount, state, handlers);
      },
      onSelectOption(option) {
        state.choices[state.currentStep] = option;
        if (state.currentStep < config.steps.length - 1) {
          state.currentStep += 1;
          renderStep(config, mount, state, handlers);
        } else {
          const { results, map } = calculateTopStyles(config, state.choices);
          state.topStyles = results;
          state.styleScores = map;
          if (config.leadCapture.enable) {
            renderLeadCapture(config, mount, handlers);
          } else {
            renderFinalSelection(config, mount, state, handlers);
          }
        }
      },
      onSubmitLead(leadData) {
        state.leadData = leadData;
        renderFinalSelection(config, mount, state, handlers);
      },
      async onSelectFinal(styleResult) {
        const definition = config.styleLibrary[styleResult.styleId];
        state.finalStyle = {
          ...styleResult,
          ...definition,
        };

        renderLoading(config, mount);
        try {
          await sendToAirtable(config, {
            participantName: state.leadData.participantName,
            email: state.leadData.email,
            choices: state.choices.map((option) => {
              if (!option) return null;
              const styleDefinition = config.styleLibrary[option.styleId];
              return {
                optionId: option.id,
                optionTitle: option.title,
                styleId: option.styleId,
                styleName: styleDefinition?.styleName || option.styleId,
              };
            }),
            finalStyle: state.finalStyle,
            styleScores: state.styleScores,
          });
          renderSuccess(config, mount, state, handlers);
        } catch (error) {
          console.error('[IDSQ] Airtable error:', error);
          renderError(config, mount, handlers);
        }
      },
      onRestart() {
        state.currentStep = -1;
        state.choices = [];
        state.topStyles = [];
        state.finalStyle = null;
        state.leadData = {};
        renderIntro(config, mount, handlers);
      },
    };

    renderIntro(config, mount, handlers);
  }

  if (typeof window !== 'undefined') {
    window.IDSQ = {
      buildQuiz,
    };
  }
})();
