# AI Recipe Generator - Wireframe Descriptions

## 1. Home Page

- **Layout**:
  - **Header**: Logo (left), navigation links (Home, Public Recipes, Favorites, Add Recipe, Calendar, Login/Signup) (right).
  - **Main Section**: Large search bar for entering tags (e.g., "vegan, Italian, quick"), "Generate Recipe" button below.
  - **Sidebar**: List of recently generated recipes (title and thumbnail) and quick access to favorites.
  - **Footer**: Links to About, Contact, and Terms of Service.

## 2. Recipe View Page

- **Layout**:
  - **Header**: Same as Home Page.
  - **Main Section**:
    - Recipe name (large heading).
    - Tags (displayed as badges, e.g., "Vegan," "30 min").
    - Ingredients list (bullet points).
    - Step-by-step instructions.
    - Prep time, serving size, and optional image placeholder.
  - **Action Buttons**: "Save to Favorites," "Discard," "Back to Home."
- **Functionality**:
  - Save button adds recipe to user’s Favorites (requires login).
  - Discard removes the recipe from the current session.

## 3. Add Recipe Page

- **Layout**:
  - **Header**: Same as Home Page.
  - **Main Section**: Form with fields:
    - Recipe Name
    - Tags
    - Ingredients
    - Instructions
    - Prep Time
    - Serving Size
    - Public/Private toggle.
  - **Action Buttons**: "Submit Recipe," "Cancel."
- **Functionality**:
  - Form validation ensures all fields are complete.
  - Submit saves recipe to database and redirects to Recipe View.

## 4. Favorites Page

- **Layout**:
  - **Header**: Same as Home Page.
  - **Main Section**: Grid or list of saved recipes (title, tags, thumbnail).
  - **Filter Bar**: Search by recipe name or tags.
  - **Action Buttons**: View recipe (links to Recipe View), Remove from Favorites.
- **Functionality**:
  - Filter updates list dynamically.
  - Remove button deletes recipe from user’s Favorites.

## 5. Calendar Page

- **Layout**:
  - **Header**: Same as Home Page.
  - **Main Section**: Calendar UI showing monthly view with events.
  - **Sidebar**: Form to add a new event (recipe selection, date, time, reminder type: push/email).
  - **Action Buttons**: "Add Event," "Delete Event" (on event click).
- **Functionality**:
  - Clicking a date opens a form to link a recipe and set a reminder.
  - Events display recipe name and time; clicking shows details.

## 6. Public Recipes Page

- **Layout**:
  - **Header**: Same as Home Page.
  - **Main Section**: Grid or list of public recipes submitted by users (title, tags, thumbnail, creator’s username).
  - **Filter Bar**: Search by recipe name, tags, or creator’s username.
  - **Action Buttons**: View recipe (links to Recipe View), Save to Favorites (requires login).
- **Functionality**:
  - Displays only recipes marked as "Public" by users.
  - Filter updates list dynamically based on search criteria.
  - Save button adds recipe to user’s Favorites.