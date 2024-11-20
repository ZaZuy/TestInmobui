package burundi.ilucky.payload;

import burundi.ilucky.model.Gift;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LuckyResponse {
    public LuckyResponse(String status, Gift gift) {
        this.status = status;
        this.gift = gift;
    }

    private String status;
    private Gift gift;
    private Long totalPlay;
}
