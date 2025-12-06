describe('HomePage E2E Tests', () => {
  beforeEach(() => {
    // Visit the app
    cy.visit('https://pet-applications-app.onrender.com/');
  });

  it('should display the hero section with correct text', () => {
    cy.contains('Find your').should('be.visible');
    cy.contains('Browse adoptable pets').should('be.visible');
  });

  it('should scroll to pets section when View all pets button is clicked', () => {
    cy.get('button').contains('View all pets').click();
    cy.get('#pet-list').should('be.visible');
  });

  it('should display the list of pets if available', () => {
    cy.get('.pet-card').should('exist'); 
  });

  it('should navigate to pet details when a pet is clicked', () => {
    cy.get('.pet-card-link').first().click();
    cy.url().should('include', '/pets/');
  });
});
