package demo.greeting;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/greetings")
public class GreetingController {
    private static final Logger log = LoggerFactory.getLogger(GreetingController.class);

    private final GreetingRepository repository;

    public GreetingController(GreetingRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Greeting> getGreetings() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Greeting createGreeting(@Valid @RequestBody GreetingRequest request) {
        String receivedAt = OffsetDateTime.now().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        log.info("Получено сообщение в {}: имя='{}', сообщение='{}'",
                receivedAt, request.name(), request.message());
        return repository.save(new Greeting(request.name(), request.message()));
    }

    public record GreetingRequest(
            @NotBlank @Size(max = 80) String name,
            @NotBlank @Size(max = 500) String message
    ) {
    }
}
