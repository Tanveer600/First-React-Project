namespace TransactionProject.Models
{
    public class Transaction
    {
        public int ID { get; set; }
        public DateTime TransactionDate { get; set; }
        public int AccountID { get; set; }
        public string ? Description { get; set; }
        public decimal DebitAmount { get; set; }  // Changed from int to decimal
        public decimal CreditAmount { get; set; } // Changed from int to decimal
    }

}
