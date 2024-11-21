package burundi.ilucky.service;

import burundi.ilucky.model.Gift;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GiftService {

    public static Map<String, Gift> gifts;
    public static Map<String, Integer> giftWeights; 

    static {
        gifts = new HashMap<>();
        giftWeights = new HashMap<>();

        // Define gifts and their corresponding weights (percentages)
        gifts.put("10000VND", new Gift("10000VND", "10.000 VND", 10000, "VND"));
        giftWeights.put("10000VND", 1);  // 1%

        gifts.put("1000VND", new Gift("1000VND", "1.000 VND", 1000, "VND"));
        giftWeights.put("1000VND", 2);  // 2%

        gifts.put("500VND", new Gift("500VND", "500 VND", 500, "VND"));
        giftWeights.put("500VND", 3);  // 3%

        gifts.put("200VND", new Gift("200VND", "200 VND", 200, "VND"));
        giftWeights.put("200VND", 5);  // 5%

        // Mảnh Samsung
        gifts.put("SAMSUNG1", new Gift("SAMSUNG1", "Mảnh Samsung 1", 1, "SAMSUNG"));
        giftWeights.put("SAMSUNG1", 7);  // 7%

        gifts.put("SAMSUNG2", new Gift("SAMSUNG2", "Mảnh Samsung 2", 1, "SAMSUNG"));
        giftWeights.put("SAMSUNG2", 7);  // 7%

        gifts.put("SAMSUNG3", new Gift("SAMSUNG3", "Mảnh Samsung 3", 1, "SAMSUNG"));
        giftWeights.put("SAMSUNG3", 5);  // 5%

        gifts.put("SAMSUNG4", new Gift("SAMSUNG4", "Mảnh Samsung 4", 1, "SAMSUNG"));
        giftWeights.put("SAMSUNG4", 7);  // 7%

        // Chữ cái
        gifts.put("L", new Gift("L", "1 Chữ cái \"L\"", 1, "PIECE"));
        giftWeights.put("L", 5);  // 5%

        gifts.put("I", new Gift("I", "1 Chữ cái \"I\"", 1, "PIECE"));
        giftWeights.put("I", 2);  // 2%

        gifts.put("T", new Gift("T", "1 Chữ cái \"T\"", 1, "PIECE"));
        giftWeights.put("T", 5);  // 5%

        gifts.put("E", new Gift("E", "1 Chữ cái \"E\"", 1, "PIECE"));
        giftWeights.put("E", 5);  // 5%

        // Share
        gifts.put("SHARE", new Gift("SHARE", "Chia sẻ cho bạn bè để nhận được 1 lượt chơi", 1, "SHARE"));
        giftWeights.put("SHARE", 8);  // 8%

        // Stars
        gifts.put("5555STARS", new Gift("5555STARS", "5555 Sao", 4, "STARS"));
        giftWeights.put("5555STARS", 10);  // 10%

        gifts.put("555STARS", new Gift("555STARS", "555 Sao", 3, "STARS"));
        giftWeights.put("555STARS", 8);  // 8%

        gifts.put("55STARS", new Gift("55STARS", "55 Sao", 2, "STARS"));
        giftWeights.put("55STARS", 6);  // 6%

        gifts.put("5STARS", new Gift("5STARS", "5 Sao", 1, "STARS"));
        giftWeights.put("5STARS", 5);  // 5%

        // Unlucky
        gifts.put("UNLUCKY", new Gift("UNLUCKY", "Chúc bạn may mắn lần sau", 1, "UNLUCKY"));
        giftWeights.put("UNLUCKY", 9);  // 9%
    }

    public static Gift getRandomGift() {
        int totalWeight = giftWeights.values().stream().mapToInt(Integer::intValue).sum();

        Random random = new Random();
        int randomValue = random.nextInt(totalWeight);

        int currentWeight = 0;
        for (Map.Entry<String, Integer> entry : giftWeights.entrySet()) {
            currentWeight += entry.getValue();
            if (randomValue < currentWeight) {
                return gifts.get(entry.getKey());
            }
        }

        return null;
    }
}
