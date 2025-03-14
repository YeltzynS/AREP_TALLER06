import com.edu.eci.arep.clase6.WebSecure;
import com.edu.eci.arep.clase6.model.Property;
import com.edu.eci.arep.clase6.service.PropertyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest(classes = WebSecure.class)
@ExtendWith(SpringExtension.class)
class PropertyServiceTest {

    @Autowired
    private PropertyService propertyService;

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
    void testSaveProperty() {
        Property savedProperty = propertyService.saveProperty(property);
        assertNotNull(savedProperty);
        assertEquals("123 Calle Principal", savedProperty.getAddress());
    }

    @Test
    void testGetAllProperties() {
        List<Property> properties = propertyService.getAllProperties();
        assertNotNull(properties);
    }

}