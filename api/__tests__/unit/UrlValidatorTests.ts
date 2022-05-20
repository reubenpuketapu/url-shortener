import { validateUrl } from "../../src/app/validators/UrlValidator";

describe('Url Validator Tests', () => {
    it('should return true for a valid URL', () => {
      // Arrange
      const url = 'https://google.com'
      // Act 
      const valid = validateUrl(url);
      // Assert
      expect(valid).toBeTruthy();
    });

    it('should return false for a invalid URL', () => {
      // Arrange
      const url = 'https://go??????ogle.com'
      // Act 
      const valid = validateUrl(url);
      // Assert
      expect(valid).toBeFalsy();
    });
});