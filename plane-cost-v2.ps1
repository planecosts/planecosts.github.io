function Find-RealCostPerHour() {
    param(
        $HoursFlownPerYear,
        $FixedCosts,
        $GallonsPerHour,
        $OverhaulFundPerHour,
        $PropFundPerHour
    )
    $Out = @()
    $HourlyOperatingCosts = ($GallonsPerHour * 5) + $OverhaulFundPerHour + $PropFundPerHour + 2
    
    ForEach ($hour in $HoursFlownPerYear) {
        $CostPerHour = [Math]::Round((($FixedCosts/$hour)+ $HourlyOperatingCosts), 2)
        
        $out += [PSCustomObject]@{
            CostPerHour = "{0:C2}" -f $CostPerHour
            HoursFlownPerMonth = [Math]::Round(($hour/12), 2)
            CostPerMonth = "{0:C2}" -f ($CostPerHour * ($hour/12))
            HoursFlownPerYear = $hour
            CostPerYear = "{0:C2}" -f ($CostPerHour * ($hour))
        }
    }
    return $Out
}