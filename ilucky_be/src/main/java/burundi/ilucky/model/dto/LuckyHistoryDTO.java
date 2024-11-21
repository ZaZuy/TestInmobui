package burundi.ilucky.model.dto;

import java.util.Date;

import burundi.ilucky.model.Gift;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LuckyHistoryDTO {
	private Date addTime;
	private Gift gift;
}
