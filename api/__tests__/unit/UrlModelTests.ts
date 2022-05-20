import { generateShort } from "../../src/app/domain/models/Url";

describe('Url Model Tests', () => {
    it('should generate a string of length 8', () => {
      // Arrange
      // Act 
      const short = generateShort();
      // Assert
      expect(short.length).toBe(8);
    });
});