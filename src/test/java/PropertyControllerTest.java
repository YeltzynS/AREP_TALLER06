import com.edu.eci.arep.clase6.WebSecure;
import com.edu.eci.arep.clase6.controller.PropertyController;
import com.edu.eci.arep.clase6.model.Property;
import com.edu.eci.arep.clase6.service.PropertyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.springframework.http.HttpStatus.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest(classes = WebSecure.class)
@ExtendWith(SpringExtension.class)
class PropertyControllerTest {

    @Autowired
    private PropertyService propertyService; 

    @Autowired
    private PropertyController propertyController;

    private Property property;

    @BeforeEach
    void setUp() {
        property = new Property();
        property.setId(1L);
        property.setAddress("123 Calle Principal");
        property.setPrice(250000.0);
        property.setSize(100.0);
        property.setDescription("Hermosa casa");
        property.setPhone("123456789");
    }


    @Test
    void testCreateProperty() {
        ResponseEntity<Property> response = propertyController.createProperty(property);
        assertEquals(CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    void testGetPropertyByIdNotFound() {
        ResponseEntity<Property> response = propertyController.getPropertyById(99L); // ID que no existe
        assertEquals(NOT_FOUND, response.getStatusCode());
    }
}