package com.system.cms.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintStatsDTO {
    private long total;
    private long resolved;
    private long pending;
    private long inProgress;
    private long newCount;


}
